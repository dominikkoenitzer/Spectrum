import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

extend([a11yPlugin]);

export interface ContrastResult {
  ratio: number;
  ratioString: string;
  aa: {
    normalText: boolean;
    largeText: boolean;
    uiComponents: boolean;
  };
  aaa: {
    normalText: boolean;
    largeText: boolean;
  };
  score: 'Fail' | 'AA Large' | 'AA' | 'AAA';
}

export function checkContrast(foreground: string, background: string): ContrastResult {
  const fg = colord(foreground);
  const bg = colord(background);
  const ratio = fg.contrast(bg);

  const result: ContrastResult = {
    ratio,
    ratioString: `${ratio.toFixed(2)}:1`,
    aa: {
      normalText: ratio >= 4.5,
      largeText: ratio >= 3,
      uiComponents: ratio >= 3,
    },
    aaa: {
      normalText: ratio >= 7,
      largeText: ratio >= 4.5,
    },
    score: 'Fail',
  };

  if (ratio >= 7) {
    result.score = 'AAA';
  } else if (ratio >= 4.5) {
    result.score = 'AA';
  } else if (ratio >= 3) {
    result.score = 'AA Large';
  }

  return result;
}

export function suggestBetterContrast(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): { lighter: string; darker: string } {
  const fg = colord(foreground);
  const bg = colord(background);
  
  let lighter = fg;
  let darker = fg;
  
  // Try to find a lighter version that meets contrast
  for (let i = 0; i < 100; i += 5) {
    const lightened = fg.lighten(i / 100);
    if (lightened.contrast(bg) >= targetRatio) {
      lighter = lightened;
      break;
    }
  }
  
  // Try to find a darker version that meets contrast
  for (let i = 0; i < 100; i += 5) {
    const darkened = fg.darken(i / 100);
    if (darkened.contrast(bg) >= targetRatio) {
      darker = darkened;
      break;
    }
  }
  
  return {
    lighter: lighter.toHex(),
    darker: darker.toHex(),
  };
}

export function suggestAccessibleColors(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): { foreground: string[]; background: string[] } {
  const fg = colord(foreground);
  const bg = colord(background);
  
  const fgSuggestions: string[] = [];
  const bgSuggestions: string[] = [];
  
  // Try lighter and darker foreground colors
  for (let i = 5; i <= 50; i += 5) {
    const lightened = fg.lighten(i / 100);
    if (lightened.contrast(bg) >= targetRatio && !fgSuggestions.includes(lightened.toHex())) {
      fgSuggestions.push(lightened.toHex());
    }
    
    const darkened = fg.darken(i / 100);
    if (darkened.contrast(bg) >= targetRatio && !fgSuggestions.includes(darkened.toHex())) {
      fgSuggestions.push(darkened.toHex());
    }
    
    if (fgSuggestions.length >= 5) break;
  }
  
  // Try lighter and darker background colors
  for (let i = 5; i <= 50; i += 5) {
    const lightened = bg.lighten(i / 100);
    if (fg.contrast(lightened) >= targetRatio && !bgSuggestions.includes(lightened.toHex())) {
      bgSuggestions.push(lightened.toHex());
    }
    
    const darkened = bg.darken(i / 100);
    if (fg.contrast(darkened) >= targetRatio && !bgSuggestions.includes(darkened.toHex())) {
      bgSuggestions.push(darkened.toHex());
    }
    
    if (bgSuggestions.length >= 5) break;
  }
  
  return {
    foreground: fgSuggestions,
    background: bgSuggestions,
  };
}

/**
 * Black or white, whichever actually contrasts more with the background.
 *
 * This used to branch on `colord().isDark()`, which is a perceived-brightness
 * threshold, not a contrast measurement, so mid-tone saturated colours picked
 * the wrong one. `#1D9E75` returned white at 3.38:1 (failing AA) when black
 * would have given 6.2:1. Comparing the two ratios directly is always at least
 * as good and never worse.
 */
export function getReadableTextColor(background: string): string {
  const bg = colord(background);
  return bg.contrast('#000000') >= bg.contrast('#ffffff') ? '#000000' : '#ffffff';
}
