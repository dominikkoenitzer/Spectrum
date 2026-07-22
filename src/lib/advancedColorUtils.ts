import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import hwbPlugin from 'colord/plugins/hwb';
import labPlugin from 'colord/plugins/lab';
import lchPlugin from 'colord/plugins/lch';
import xyzPlugin from 'colord/plugins/xyz';
import cmykPlugin from 'colord/plugins/cmyk';

extend([namesPlugin, hwbPlugin, labPlugin, lchPlugin, xyzPlugin, cmykPlugin]);

// ============ Extended Color Formats ============

export interface ExtendedColorFormats {
  hex: string;
  rgb: { r: number; g: number; b: number };
  rgbString: string;
  hsl: { h: number; s: number; l: number };
  hslString: string;
  hsv: { h: number; s: number; v: number };
  hsvString: string;
  hwb: { h: number; w: number; b: number };
  hwbString: string;
  cmyk: { c: number; m: number; y: number; k: number };
  cmykString: string;
  lab: { l: number; a: number; b: number };
  labString: string;
  lch: { l: number; c: number; h: number };
  lchString: string;
  xyz: { x: number; y: number; z: number };
  xyzString: string;
  name: string | null;
}

export function getExtendedFormats(color: string): ExtendedColorFormats {
  const c = colord(color);
  const rgb = c.toRgb();
  const hsl = c.toHsl();
  const hsv = c.toHsv();
  const hwb = c.toHwb();
  const cmyk = c.toCmyk();
  const lab = c.toLab();
  const lch = c.toLch();
  const xyz = c.toXyz();

  return {
    hex: c.toHex().toUpperCase(),
    rgb: { r: rgb.r, g: rgb.g, b: rgb.b },
    rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: { h: Math.round(hsl.h), s: Math.round(hsl.s), l: Math.round(hsl.l) },
    hslString: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
    hsv: { h: Math.round(hsv.h), s: Math.round(hsv.s), v: Math.round(hsv.v) },
    hsvString: `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`,
    hwb: { h: Math.round(hwb.h), w: Math.round(hwb.w), b: Math.round(hwb.b) },
    hwbString: `hwb(${Math.round(hwb.h)}, ${Math.round(hwb.w)}%, ${Math.round(hwb.b)}%)`,
    cmyk: { c: Math.round(cmyk.c), m: Math.round(cmyk.m), y: Math.round(cmyk.y), k: Math.round(cmyk.k) },
    cmykString: `cmyk(${Math.round(cmyk.c)}%, ${Math.round(cmyk.m)}%, ${Math.round(cmyk.y)}%, ${Math.round(cmyk.k)}%)`,
    lab: { l: Math.round(lab.l), a: Math.round(lab.a), b: Math.round(lab.b) },
    labString: `lab(${Math.round(lab.l)}, ${Math.round(lab.a)}, ${Math.round(lab.b)})`,
    lch: { l: Math.round(lch.l), c: Math.round(lch.c), h: Math.round(lch.h) },
    lchString: `lch(${Math.round(lch.l)}, ${Math.round(lch.c)}, ${Math.round(lch.h)})`,
    xyz: { x: Math.round(xyz.x), y: Math.round(xyz.y), z: Math.round(xyz.z) },
    xyzString: `xyz(${Math.round(xyz.x)}, ${Math.round(xyz.y)}, ${Math.round(xyz.z)})`,
    name: c.toName({ closest: true }) || null,
  };
}

// ============ Shades and Tints ============

export interface ColorVariation {
  percentage: number;
  hex: string;
}

export function generateShades(color: string, steps: number = 11): ColorVariation[] {
  const c = colord(color);
  const shades: ColorVariation[] = [];

  for (let i = 0; i < steps; i++) {
    const percentage = Math.round((i / (steps - 1)) * 100);
    const shade = c.darken(percentage / 100);
    shades.push({
      percentage,
      hex: shade.toHex().toUpperCase(),
    });
  }
  
  return shades;
}

export function generateTints(color: string, steps: number = 11): ColorVariation[] {
  const c = colord(color);
  const tints: ColorVariation[] = [];

  for (let i = 0; i < steps; i++) {
    const percentage = Math.round((i / (steps - 1)) * 100);
    const tint = c.lighten(percentage / 100);
    tints.push({
      percentage,
      hex: tint.toHex().toUpperCase(),
    });
  }
  
  return tints;
}

// ============ Color Harmonies ============

export interface ColorHarmony {
  name: string;
  description: string;
  bestFor: string;
  colors: string[];
}

export function getComplement(color: string): ColorHarmony {
  const c = colord(color);
  return {
    name: 'Complement',
    description: 'A color and its opposite on the color wheel, +180 degrees of hue. High contrast.',
    bestFor: 'High-impact designs, CTAs, logos',
    colors: [c.toHex().toUpperCase(), c.rotate(180).toHex().toUpperCase()],
  };
}

export function getSplitComplementary(color: string): ColorHarmony {
  const c = colord(color);
  return {
    name: 'Split-complementary',
    description: 'A color and two adjacent to its complement, ±30 degrees from the opposite. Bold but versatile.',
    bestFor: 'Vibrant yet balanced layouts',
    colors: [
      c.toHex().toUpperCase(),
      c.rotate(150).toHex().toUpperCase(),
      c.rotate(210).toHex().toUpperCase(),
    ],
  };
}

export function getTriadic(color: string): ColorHarmony {
  const c = colord(color);
  return {
    name: 'Triadic',
    description: 'Three colors spaced evenly along the color wheel, each 120 degrees apart.',
    bestFor: 'Playful, energetic designs',
    colors: [
      c.toHex().toUpperCase(),
      c.rotate(120).toHex().toUpperCase(),
      c.rotate(240).toHex().toUpperCase(),
    ],
  };
}

export function getAnalogous(color: string): ColorHarmony {
  const c = colord(color);
  return {
    name: 'Analogous',
    description: 'Three adjacent colors on the color wheel, 30 degrees apart. Smooth transitions.',
    bestFor: 'Nature-inspired, calming interfaces',
    colors: [
      c.rotate(-30).toHex().toUpperCase(),
      c.toHex().toUpperCase(),
      c.rotate(30).toHex().toUpperCase(),
    ],
  };
}

export function getMonochromatic(color: string): ColorHarmony {
  const c = colord(color);
  return {
    name: 'Monochromatic',
    description: 'Three colors of the same hue with different luminance values. Subtle and refined.',
    bestFor: 'Minimalist, sophisticated designs',
    colors: [
      c.darken(0.3).toHex().toUpperCase(),
      c.toHex().toUpperCase(),
      c.lighten(0.3).toHex().toUpperCase(),
    ],
  };
}

export function getTetradic(color: string): ColorHarmony {
  const c = colord(color);
  return {
    name: 'Tetradic',
    description: 'Two sets of complementary colors, separated by 60 degrees of hue.',
    bestFor: 'Rich, diverse color schemes',
    colors: [
      c.toHex().toUpperCase(),
      c.rotate(60).toHex().toUpperCase(),
      c.rotate(180).toHex().toUpperCase(),
      c.rotate(240).toHex().toUpperCase(),
    ],
  };
}

export function getAllHarmonies(color: string): ColorHarmony[] {
  return [
    getComplement(color),
    getSplitComplementary(color),
    getTriadic(color),
    getAnalogous(color),
    getMonochromatic(color),
    getTetradic(color),
  ];
}

// ============ Technical Formats ============

export interface TechnicalFormats {
  // HSI - Hue, Saturation, Intensity
  hsi: { h: number; s: number; i: number };
  hsiString: string;
  
  // YUV - Video/Broadcast
  yuv: { y: number; u: number; v: number };
  yuvString: string;
  
  // YCbCr - Digital Video
  ycbcr: { y: number; cb: number; cr: number };
  ycbcrString: string;
  
  // Integer representation
  integer: number;
  integerString: string;
  
  // Binary
  binary: string;
  
  // Byte orders
  rgbBytes: string;
  bgrBytes: string;
  argbBytes: string;
  
  // Base64
  base64: string;
  
  // CSS filter approximation
  cssFilter: string;
}

function rgbToHsi(r: number, g: number, b: number): { h: number; s: number; i: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const i = (r + g + b) / 3;
  const min = Math.min(r, g, b);
  const s = i === 0 ? 0 : 1 - min / i;
  
  let h = 0;
  if (s !== 0) {
    const num = 0.5 * ((r - g) + (r - b));
    const den = Math.sqrt((r - g) ** 2 + (r - b) * (g - b));
    h = Math.acos(num / (den || 1)) * (180 / Math.PI);
    if (b > g) h = 360 - h;
  }
  
  return { h: Math.round(h), s: Math.round(s * 100), i: Math.round(i * 100) };
}

function rgbToYuv(r: number, g: number, b: number): { y: number; u: number; v: number } {
  const y = 0.299 * r + 0.587 * g + 0.114 * b;
  const u = -0.14713 * r - 0.28886 * g + 0.436 * b + 128;
  const v = 0.615 * r - 0.51499 * g - 0.10001 * b + 128;
  
  return { y: Math.round(y), u: Math.round(u), v: Math.round(v) };
}

function rgbToYcbcr(r: number, g: number, b: number): { y: number; cb: number; cr: number } {
  const y = 16 + 65.481 * (r / 255) + 128.553 * (g / 255) + 24.966 * (b / 255);
  const cb = 128 - 37.797 * (r / 255) - 74.203 * (g / 255) + 112 * (b / 255);
  const cr = 128 + 112 * (r / 255) - 93.786 * (g / 255) - 18.214 * (b / 255);
  
  return { y: Math.round(y), cb: Math.round(cb), cr: Math.round(cr) };
}

export function getTechnicalFormats(color: string): TechnicalFormats {
  const c = colord(color);
  const rgb = c.toRgb();
  const { r, g, b } = rgb;
  
  const hsi = rgbToHsi(r, g, b);
  const yuv = rgbToYuv(r, g, b);
  const ycbcr = rgbToYcbcr(r, g, b);
  
  const integer = (r << 16) + (g << 8) + b;
  const binary = integer.toString(2).padStart(24, '0');
  
  const hex = c.toHex().replace('#', '');
  const rgbBytes = `0x${hex.toUpperCase()}`;
  const bgrBytes = `0x${hex.slice(4, 6)}${hex.slice(2, 4)}${hex.slice(0, 2)}`.toUpperCase();
  const argbBytes = `0xFF${hex.toUpperCase()}`;
  
  const base64 = btoa(String.fromCharCode(r, g, b));
  
  // Simple CSS filter approximation (not perfect but useful)
  const hsl = c.toHsl();
  const cssFilter = `hue-rotate(${Math.round(hsl.h)}deg) saturate(${Math.round(hsl.s)}%) brightness(${Math.round(hsl.l)}%)`;
  
  return {
    hsi,
    hsiString: `hsi(${hsi.h}, ${hsi.s}%, ${hsi.i}%)`,
    yuv,
    yuvString: `yuv(${yuv.y}, ${yuv.u}, ${yuv.v})`,
    ycbcr,
    ycbcrString: `YCbCr(${ycbcr.y}, ${ycbcr.cb}, ${ycbcr.cr})`,
    integer,
    integerString: integer.toString(),
    binary,
    rgbBytes,
    bgrBytes,
    argbBytes,
    base64,
    cssFilter,
  };
}

// ============ Color Analysis ============

export interface ColorAnalysis {
  // Brightness/Luminance
  luminance: number;
  relativeLuminance: number;
  perceivedBrightness: number;
  
  // Color properties
  isWarm: boolean;
  isCool: boolean;
  isDark: boolean;
  isLight: boolean;
  isNeutral: boolean;
  isSaturated: boolean;
  
  // Dominant wavelength approximation
  dominantWavelength: number;
  wavelengthName: string;
  
  // Purity/Chroma
  chroma: number;
  purity: number;
  
  // Temperature
  temperature: 'warm' | 'neutral' | 'cool';
  temperatureValue: number;
}

function getWavelengthFromHue(hue: number): { wavelength: number; name: string } {
  // Approximate wavelength based on hue (visible spectrum 380-700nm)
  const wavelengthMap: { range: [number, number]; wavelength: number; name: string }[] = [
    { range: [0, 15], wavelength: 700, name: 'Red' },
    { range: [15, 45], wavelength: 620, name: 'Orange' },
    { range: [45, 75], wavelength: 580, name: 'Yellow' },
    { range: [75, 150], wavelength: 550, name: 'Green' },
    { range: [150, 210], wavelength: 495, name: 'Cyan' },
    { range: [210, 270], wavelength: 450, name: 'Blue' },
    { range: [270, 330], wavelength: 400, name: 'Violet' },
    { range: [330, 360], wavelength: 700, name: 'Red' },
  ];
  
  for (const entry of wavelengthMap) {
    if (hue >= entry.range[0] && hue < entry.range[1]) {
      return { wavelength: entry.wavelength, name: entry.name };
    }
  }
  
  return { wavelength: 550, name: 'Green' };
}

export function analyzeColor(color: string): ColorAnalysis {
  const c = colord(color);
  const rgb = c.toRgb();
  const hsl = c.toHsl();
  const lch = c.toLch();
  
  // Calculate luminance
  const luminance = c.luminance();
  const relativeLuminance = luminance * 100;
  
  // Perceived brightness (human perception weighted)
  const perceivedBrightness = Math.round(
    (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 * 100
  );
  
  // Temperature based on hue
  const hue = hsl.h;
  const isWarm = (hue >= 0 && hue <= 60) || (hue >= 300 && hue <= 360);
  const isCool = hue > 150 && hue < 270;
  
  // Determine temperature value (warm positive, cool negative)
  let temperatureValue = 0;
  if (hue <= 60) temperatureValue = 60 - hue;
  else if (hue >= 300) temperatureValue = hue - 300;
  else if (hue >= 180) temperatureValue = 180 - hue;
  else temperatureValue = hue - 180;
  
  const temperature = isWarm ? 'warm' : isCool ? 'cool' : 'neutral';
  
  // Saturation checks
  const isSaturated = hsl.s > 50;
  const isNeutral = hsl.s < 10;
  
  // Lightness checks
  const isDark = hsl.l < 30;
  const isLight = hsl.l > 70;
  
  // Wavelength
  const { wavelength, name } = getWavelengthFromHue(hue);
  
  // Chroma and purity
  const chroma = Math.round(lch.c);
  const purity = Math.round(hsl.s);
  
  return {
    luminance: Math.round(luminance * 1000) / 1000,
    relativeLuminance: Math.round(relativeLuminance),
    perceivedBrightness,
    isWarm,
    isCool,
    isDark,
    isLight,
    isNeutral,
    isSaturated,
    dominantWavelength: wavelength,
    wavelengthName: name,
    chroma,
    purity,
    temperature,
    temperatureValue: Math.round(Math.abs(temperatureValue)),
  };
}

// ============ Creative Aspects ============

export interface CreativeAspects {
  // Emotional associations
  emotions: string[];
  mood: string;
  
  // Seasonal association
  season: string;
  seasonDescription: string;
  
  // Natural occurrence
  naturalExamples: string[];
  
  // Color psychology
  psychology: string;
  
  // Use cases
  useCases: string[];
  
  // Cultural meanings
  westernMeaning: string;
  easternMeaning: string;
}

export function getCreativeAspects(color: string): CreativeAspects {
  const c = colord(color);
  const hsl = c.toHsl();
  const hue = hsl.h;
  const sat = hsl.s;

  // Determine base color category
  let category: 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple' | 'pink' | 'neutral';
  
  if (sat < 10) {
    category = 'neutral';
  } else if (hue < 15 || hue >= 345) {
    category = 'red';
  } else if (hue < 45) {
    category = 'orange';
  } else if (hue < 75) {
    category = 'yellow';
  } else if (hue < 150) {
    category = 'green';
  } else if (hue < 195) {
    category = 'cyan';
  } else if (hue < 270) {
    category = 'blue';
  } else if (hue < 315) {
    category = 'purple';
  } else {
    category = 'pink';
  }
  
  const aspects: Record<string, CreativeAspects> = {
    red: {
      emotions: ['Passion', 'Energy', 'Excitement', 'Love', 'Danger'],
      mood: 'Bold and energetic',
      season: 'Autumn/Winter',
      seasonDescription: 'Associated with fall leaves and holiday celebrations',
      naturalExamples: ['Roses', 'Apples', 'Sunsets', 'Autumn leaves', 'Berries'],
      psychology: 'Increases heart rate and creates urgency. Often used to grab attention and stimulate appetite.',
      useCases: ['Sale banners', 'Food branding', 'Emergency alerts', 'Sports', 'Entertainment'],
      westernMeaning: 'Love, passion, danger, importance',
      easternMeaning: 'Good fortune, joy, celebration (especially in China)',
    },
    orange: {
      emotions: ['Enthusiasm', 'Creativity', 'Warmth', 'Adventure', 'Confidence'],
      mood: 'Friendly and inviting',
      season: 'Autumn',
      seasonDescription: 'Evokes harvest time and changing leaves',
      naturalExamples: ['Oranges', 'Pumpkins', 'Autumn leaves', 'Sunsets', 'Fire'],
      psychology: 'Combines energy of red with happiness of yellow. Promotes creativity and enthusiasm.',
      useCases: ['Call-to-action buttons', 'Food & beverage', 'Youth brands', 'Sports teams', 'Creative industries'],
      westernMeaning: 'Creativity, adventure, success',
      easternMeaning: 'Happiness, spirituality (Buddhism)',
    },
    yellow: {
      emotions: ['Happiness', 'Optimism', 'Warmth', 'Clarity', 'Caution'],
      mood: 'Cheerful and uplifting',
      season: 'Summer',
      seasonDescription: 'Represents sunshine and warm summer days',
      naturalExamples: ['Sunflowers', 'Lemons', 'Sunshine', 'Bananas', 'Daffodils'],
      psychology: 'Most visible color. Stimulates mental activity and generates optimism.',
      useCases: ['Warnings', 'Children products', 'Food packaging', 'Highlighting', 'Taxi cabs'],
      westernMeaning: 'Happiness, caution, optimism',
      easternMeaning: 'Royalty, prosperity (China), sacred (India)',
    },
    green: {
      emotions: ['Growth', 'Harmony', 'Balance', 'Health', 'Renewal'],
      mood: 'Calming and balanced',
      season: 'Spring',
      seasonDescription: 'Represents new growth and renewal',
      naturalExamples: ['Leaves', 'Grass', 'Forests', 'Emeralds', 'Limes'],
      psychology: 'Most restful color for the eye. Represents nature, healing, and stability.',
      useCases: ['Environmental brands', 'Health products', 'Finance', 'Organic food', 'Relaxation spaces'],
      westernMeaning: 'Nature, growth, money, luck',
      easternMeaning: 'New life, fertility, eternity',
    },
    cyan: {
      emotions: ['Clarity', 'Freshness', 'Cleanliness', 'Trust', 'Calm'],
      mood: 'Clean and refreshing',
      season: 'Summer',
      seasonDescription: 'Evokes clear skies and tropical waters',
      naturalExamples: ['Tropical waters', 'Clear sky', 'Glaciers', 'Turquoise stones'],
      psychology: 'Combines calming blue with refreshing green. Promotes clarity and communication.',
      useCases: ['Technology', 'Healthcare', 'Travel', 'Spas', 'Water products'],
      westernMeaning: 'Tranquility, clarity, sophistication',
      easternMeaning: 'Immortality, healing',
    },
    blue: {
      emotions: ['Trust', 'Stability', 'Calm', 'Professionalism', 'Wisdom'],
      mood: 'Trustworthy and serene',
      season: 'Winter',
      seasonDescription: 'Associated with cool winter days and evening skies',
      naturalExamples: ['Sky', 'Ocean', 'Blueberries', 'Sapphires', 'Bluebells'],
      psychology: 'Most universally liked color. Reduces stress and creates sense of security.',
      useCases: ['Corporate branding', 'Finance', 'Technology', 'Healthcare', 'Social media'],
      westernMeaning: 'Trust, loyalty, wisdom, confidence',
      easternMeaning: 'Immortality, healing (China), mourning (Iran)',
    },
    purple: {
      emotions: ['Luxury', 'Creativity', 'Mystery', 'Spirituality', 'Royalty'],
      mood: 'Luxurious and mystical',
      season: 'Spring',
      seasonDescription: 'Associated with lavender fields and spring flowers',
      naturalExamples: ['Lavender', 'Grapes', 'Amethyst', 'Orchids', 'Eggplants'],
      psychology: 'Combines stability of blue with energy of red. Associated with wisdom and creativity.',
      useCases: ['Luxury brands', 'Beauty products', 'Spirituality', 'Creative agencies', 'Royalty themes'],
      westernMeaning: 'Royalty, luxury, mystery, spirituality',
      easternMeaning: 'Wealth, privilege (Japan), mourning (Thailand)',
    },
    pink: {
      emotions: ['Love', 'Compassion', 'Playfulness', 'Romance', 'Tenderness'],
      mood: 'Romantic and gentle',
      season: 'Spring',
      seasonDescription: 'Evokes cherry blossoms and spring flowers',
      naturalExamples: ['Cherry blossoms', 'Roses', 'Flamingos', 'Peonies', 'Cotton candy'],
      psychology: 'Calming and nurturing. Often associated with femininity and romance.',
      useCases: ['Beauty brands', 'Romance', 'Baby products', 'Desserts', 'Valentine themes'],
      westernMeaning: 'Romance, femininity, sweetness',
      easternMeaning: 'Marriage, trust (Japan)',
    },
    neutral: {
      emotions: ['Sophistication', 'Balance', 'Calm', 'Professionalism', 'Timelessness'],
      mood: 'Sophisticated and versatile',
      season: 'All seasons',
      seasonDescription: 'Timeless and adaptable to any season',
      naturalExamples: ['Stones', 'Clouds', 'Fog', 'Sand', 'Pearls'],
      psychology: 'Creates balance and provides breathing room in designs. Enhances other colors.',
      useCases: ['Luxury minimalism', 'Corporate', 'Fashion', 'Architecture', 'Gallery spaces'],
      westernMeaning: 'Sophistication, neutrality, balance',
      easternMeaning: 'Mourning (white), wisdom (gray)',
    },
  };
  
  return aspects[category];
}
