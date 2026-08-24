import { describe, expect, it } from 'vitest';

import { getHueName, type HueName } from './advancedColorUtils';
import { simulateColorBlindnessHex } from './colorBlindness';
import {
  getLuminance,
  isDark,
  isLight,
  isValidColor,
  parseColor,
  rgbToFormats,
} from './colorUtils';
import { checkContrast, getReadableTextColor } from './contrastUtils';
import {
  addGradientStop,
  createDefaultGradient,
  generateGradientCSS,
  removeGradientStop,
  updateGradientStop,
} from './gradientUtils';

/*
 * These numbers are not invented. They are the reference pairs the WCAG
 * contrast formula is normally sanity-checked against. #767676 and #595959 on
 * white are the canonical AA (4.5) and AAA (7.0) boundary colours, so they pin
 * both the maths and the threshold logic at once.
 */
describe('checkContrast — WCAG reference pairs', () => {
  it('gives black on white the maximum ratio of 21', () => {
    expect(checkContrast('#000000', '#ffffff').ratio).toBeCloseTo(21, 1);
  });

  it('gives an identical pair a ratio of 1', () => {
    expect(checkContrast('#ffffff', '#ffffff').ratio).toBeCloseTo(1, 5);
  });

  it('puts #767676 on white just over the AA boundary', () => {
    const r = checkContrast('#767676', '#ffffff');
    expect(r.ratio).toBeCloseTo(4.54, 1);
    expect(r.aa.normalText).toBe(true);
    expect(r.aaa.normalText).toBe(false);
    expect(r.score).toBe('AA');
  });

  it('puts #595959 on white at the AAA boundary', () => {
    const r = checkContrast('#595959', '#ffffff');
    expect(r.ratio).toBeCloseTo(7.0, 1);
    expect(r.aaa.normalText).toBe(true);
    expect(r.score).toBe('AAA');
  });

  it('is symmetric — swapping foreground and background cannot change the ratio', () => {
    for (const [a, b] of [
      ['#1d9e75', '#ffffff'],
      ['#123456', '#fedcba'],
      ['#ff0000', '#00ff00'],
    ]) {
      expect(checkContrast(a, b).ratio).toBeCloseTo(checkContrast(b, a).ratio, 10);
    }
  });

  it('never reports a passing level its ratio does not earn', () => {
    for (const c of ['#000000', '#767676', '#595959', '#cccccc', '#ffffff', '#7f00ff']) {
      const r = checkContrast(c, '#ffffff');
      expect(r.aa.normalText).toBe(r.ratio >= 4.5);
      expect(r.aa.largeText).toBe(r.ratio >= 3);
      expect(r.aaa.normalText).toBe(r.ratio >= 7);
      expect(r.aaa.largeText).toBe(r.ratio >= 4.5);
    }
  });

  it('formats the ratio to two decimals', () => {
    expect(checkContrast('#000000', '#ffffff').ratioString).toMatch(/^\d+\.\d{2}:1$/);
  });
});

describe('getReadableTextColor', () => {
  it('picks a colour that actually passes AA against its background', () => {
    for (const bg of ['#ffffff', '#000000', '#1d9e75', '#f5d76e', '#2b2a26']) {
      const fg = getReadableTextColor(bg);
      expect(checkContrast(fg, bg).ratio).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe('colorUtils', () => {
  it('converts rgb into every advertised format', () => {
    const f = rgbToFormats(29, 158, 117);
    expect(f.hex.toLowerCase()).toBe('#1d9e75');
    expect(f.rgb).toMatchObject({ r: 29, g: 158, b: 117 });
    expect(f.rgbString).toBe('rgb(29, 158, 117)');
    expect(f.hslString).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
  });

  it('validates and rejects colour strings', () => {
    for (const good of ['#fff', '#1d9e75', 'rgb(0,0,0)', 'tomato']) {
      expect(isValidColor(good)).toBe(true);
    }
    for (const bad of ['', 'not-a-colour', '#12345', 'rgb(oops)']) {
      expect(isValidColor(bad)).toBe(false);
    }
  });

  it('returns null when parsing something that is not a colour', () => {
    expect(parseColor('definitely not a colour')).toBeNull();
  });

  it('orders luminance from black to white', () => {
    expect(getLuminance('#000000')).toBeCloseTo(0, 5);
    expect(getLuminance('#ffffff')).toBeCloseTo(1, 5);
    expect(getLuminance('#808080')).toBeGreaterThan(getLuminance('#000000'));
    expect(getLuminance('#808080')).toBeLessThan(getLuminance('#ffffff'));
  });

  it('treats dark and light as exact opposites', () => {
    for (const c of ['#000000', '#ffffff', '#1d9e75', '#f5d76e']) {
      expect(isDark(c)).toBe(!isLight(c));
    }
  });
});

describe('getHueName — one canonical hue table', () => {
  it('names the primaries', () => {
    expect(getHueName(0)).toBe('Red');
    expect(getHueName(30)).toBe('Orange');
    expect(getHueName(60)).toBe('Yellow');
    expect(getHueName(120)).toBe('Green');
    expect(getHueName(180)).toBe('Cyan');
    expect(getHueName(220)).toBe('Blue');
    expect(getHueName(270)).toBe('Indigo');
    expect(getHueName(300)).toBe('Violet');
    expect(getHueName(330)).toBe('Pink');
  });

  it('wraps around the colour wheel', () => {
    // 360 is 0; negatives and >360 normalise rather than falling through.
    expect(getHueName(360)).toBe('Red');
    expect(getHueName(350)).toBe('Red');
    expect(getHueName(-10)).toBe('Red');
    expect(getHueName(720 + 120)).toBe('Green');
  });

  it('is total — every integer hue gets a name', () => {
    const names = new Set<HueName>();
    for (let h = 0; h < 360; h++) {
      const n = getHueName(h);
      expect(n).toBeTruthy();
      names.add(n);
    }
    expect(names.size).toBe(9);
  });

  it('changes name exactly once per band boundary', () => {
    // Regression guard: three separate hue tables used to disagree, so hue 200
    // was "Blue" in one tool and "Cyan" in another. There is one table now.
    let flips = 0;
    for (let h = 1; h < 360; h++) {
      if (getHueName(h) !== getHueName(h - 1)) flips++;
    }
    // 9 bands, but Red owns both ends of the wheel, so there are 9 interior
    // boundaries across 0..359 rather than 8.
    expect(flips).toBe(9);
  });
});

describe('simulateColorBlindness', () => {
  it('returns a valid colour for every type', () => {
    for (const type of [
      'protanopia',
      'deuteranopia',
      'tritanopia',
      'achromatopsia',
    ] as const) {
      expect(isValidColor(simulateColorBlindnessHex('#ff0000', type))).toBe(true);
    }
  });

  it('leaves greyscale essentially untouched', () => {
    const out = simulateColorBlindnessHex('#808080', 'protanopia');
    const rgb = parseColor(out)!.toRgb();
    expect(Math.abs(rgb.r - rgb.g)).toBeLessThan(12);
    expect(Math.abs(rgb.g - rgb.b)).toBeLessThan(12);
  });

  it('collapses achromatopsia to a true grey', () => {
    const rgb = parseColor(simulateColorBlindnessHex('#ff0000', 'achromatopsia'))!.toRgb();
    expect(rgb.r).toBe(rgb.g);
    expect(rgb.g).toBe(rgb.b);
  });

  it('actually shifts red under protanopia', () => {
    expect(simulateColorBlindnessHex('#ff0000', 'protanopia').toLowerCase()).not.toBe('#ff0000');
  });
});

describe('gradientUtils', () => {
  it('emits CSS matching the gradient type', () => {
    const g = createDefaultGradient();
    expect(generateGradientCSS(g)).toContain('linear-gradient');
    expect(generateGradientCSS({ ...g, type: 'radial' })).toContain('radial-gradient');
    expect(generateGradientCSS({ ...g, type: 'conic' })).toContain('conic-gradient');
  });

  it('adds, updates and removes stops without mutating the input', () => {
    const g = createDefaultGradient();
    const before = g.stops.length;

    const added = addGradientStop(g, '#1d9e75', 50);
    expect(added.stops).toHaveLength(before + 1);
    expect(g.stops).toHaveLength(before); // original untouched

    const id = added.stops[added.stops.length - 1]!.id;
    const updated = updateGradientStop(added, id, { color: '#000000' });
    expect(updated.stops.find((s) => s.id === id)!.color).toBe('#000000');

    expect(removeGradientStop(updated, id).stops).toHaveLength(before);
  });
});
