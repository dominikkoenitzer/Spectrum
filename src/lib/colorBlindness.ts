export type ColorBlindnessType =
  | 'protanopia'
  | 'protanomaly'
  | 'deuteranopia'
  | 'deuteranomaly'
  | 'tritanopia'
  | 'tritanomaly'
  | 'achromatopsia'
  | 'achromatomaly';

export interface ColorBlindnessInfo {
  type: ColorBlindnessType;
  name: string;
  description: string;
  prevalence: string;
}

export const colorBlindnessTypes: ColorBlindnessInfo[] = [
  {
    type: 'protanopia',
    name: 'Protanopia',
    description: 'Red-blind - cannot perceive red light',
    prevalence: '~1% of males',
  },
  {
    type: 'protanomaly',
    name: 'Protanomaly',
    description: 'Red-weak - reduced sensitivity to red light',
    prevalence: '~1% of males',
  },
  {
    type: 'deuteranopia',
    name: 'Deuteranopia',
    description: 'Green-blind - cannot perceive green light',
    prevalence: '~1% of males',
  },
  {
    type: 'deuteranomaly',
    name: 'Deuteranomaly',
    description: 'Green-weak - reduced sensitivity to green light',
    prevalence: '~5% of males',
  },
  {
    type: 'tritanopia',
    name: 'Tritanopia',
    description: 'Blue-blind - cannot perceive blue light',
    prevalence: '~0.01%',
  },
  {
    type: 'tritanomaly',
    name: 'Tritanomaly',
    description: 'Blue-weak - reduced sensitivity to blue light',
    prevalence: 'Very rare',
  },
  {
    type: 'achromatopsia',
    name: 'Achromatopsia',
    description: 'Complete color blindness - sees only grayscale',
    prevalence: '~0.003%',
  },
  {
    type: 'achromatomaly',
    name: 'Achromatomaly',
    description: 'Partial color blindness - very weak color perception',
    prevalence: 'Very rare',
  },
];

// Color transformation matrices for different types of color blindness
// Based on research by Machado, Oliveira, and Fernandes (2009)
const matrices: Record<ColorBlindnessType, number[]> = {
  protanopia: [
    0.567, 0.433, 0,
    0.558, 0.442, 0,
    0, 0.242, 0.758,
  ],
  protanomaly: [
    0.817, 0.183, 0,
    0.333, 0.667, 0,
    0, 0.125, 0.875,
  ],
  deuteranopia: [
    0.625, 0.375, 0,
    0.7, 0.3, 0,
    0, 0.3, 0.7,
  ],
  deuteranomaly: [
    0.8, 0.2, 0,
    0.258, 0.742, 0,
    0, 0.142, 0.858,
  ],
  tritanopia: [
    0.95, 0.05, 0,
    0, 0.433, 0.567,
    0, 0.475, 0.525,
  ],
  tritanomaly: [
    0.967, 0.033, 0,
    0, 0.733, 0.267,
    0, 0.183, 0.817,
  ],
  achromatopsia: [
    0.299, 0.587, 0.114,
    0.299, 0.587, 0.114,
    0.299, 0.587, 0.114,
  ],
  achromatomaly: [
    0.618, 0.320, 0.062,
    0.163, 0.775, 0.062,
    0.163, 0.320, 0.516,
  ],
};

export function simulateColorBlindness(
  r: number,
  g: number,
  b: number,
  type: ColorBlindnessType
): { r: number; g: number; b: number } {
  const matrix = matrices[type];
  
  return {
    r: Math.round(Math.min(255, Math.max(0, r * matrix[0] + g * matrix[1] + b * matrix[2]))),
    g: Math.round(Math.min(255, Math.max(0, r * matrix[3] + g * matrix[4] + b * matrix[5]))),
    b: Math.round(Math.min(255, Math.max(0, r * matrix[6] + g * matrix[7] + b * matrix[8]))),
  };
}

export function simulateColorBlindnessHex(hex: string, type: ColorBlindnessType): string {
  // Parse hex color
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  const simulated = simulateColorBlindness(r, g, b, type);
  
  return `#${simulated.r.toString(16).padStart(2, '0')}${simulated.g.toString(16).padStart(2, '0')}${simulated.b.toString(16).padStart(2, '0')}`;
}

export function applyColorBlindnessToCanvas(
  sourceCanvas: HTMLCanvasElement,
  targetCanvas: HTMLCanvasElement,
  type: ColorBlindnessType
): void {
  const sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
  const targetCtx = targetCanvas.getContext('2d');
  
  if (!sourceCtx || !targetCtx) return;
  
  targetCanvas.width = sourceCanvas.width;
  targetCanvas.height = sourceCanvas.height;
  
  const imageData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
  const data = imageData.data;
  const matrix = matrices[type];
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    data[i] = Math.round(Math.min(255, Math.max(0, r * matrix[0] + g * matrix[1] + b * matrix[2])));
    data[i + 1] = Math.round(Math.min(255, Math.max(0, r * matrix[3] + g * matrix[4] + b * matrix[5])));
    data[i + 2] = Math.round(Math.min(255, Math.max(0, r * matrix[6] + g * matrix[7] + b * matrix[8])));
  }
  
  targetCtx.putImageData(imageData, 0, 0);
}
