export interface GradientStop {
  id: string;
  color: string;
  position: number; // 0-100
}

export type GradientType = 'linear' | 'radial' | 'conic';

export interface GradientConfig {
  type: GradientType;
  angle: number; // for linear gradients (0-360)
  stops: GradientStop[];
}

export function generateGradientCSS(config: GradientConfig): string {
  const sortedStops = [...config.stops].sort((a, b) => a.position - b.position);
  const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');

  switch (config.type) {
    case 'linear':
      return `linear-gradient(${config.angle}deg, ${stopsStr})`;
    case 'radial':
      return `radial-gradient(circle, ${stopsStr})`;
    case 'conic':
      return `conic-gradient(from ${config.angle}deg, ${stopsStr})`;
    default:
      return `linear-gradient(${config.angle}deg, ${stopsStr})`;
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function createDefaultGradient(): GradientConfig {
  return {
    type: 'linear',
    angle: 90,
    stops: [
      { id: generateId(), color: '#667eea', position: 0 },
      { id: generateId(), color: '#764ba2', position: 100 },
    ],
  };
}

export function addGradientStop(config: GradientConfig, color: string, position: number): GradientConfig {
  return {
    ...config,
    stops: [...config.stops, { id: generateId(), color, position }],
  };
}

export function removeGradientStop(config: GradientConfig, id: string): GradientConfig {
  if (config.stops.length <= 2) return config; // Minimum 2 stops
  return {
    ...config,
    stops: config.stops.filter((s) => s.id !== id),
  };
}

export function updateGradientStop(
  config: GradientConfig,
  id: string,
  updates: Partial<Omit<GradientStop, 'id'>>
): GradientConfig {
  return {
    ...config,
    stops: config.stops.map((s) => (s.id === id ? { ...s, ...updates } : s)),
  };
}

export const presetGradients: GradientConfig[] = [
  {
    type: 'linear',
    angle: 135,
    stops: [
      { id: '1', color: '#667eea', position: 0 },
      { id: '2', color: '#764ba2', position: 100 },
    ],
  },
  {
    type: 'linear',
    angle: 90,
    stops: [
      { id: '1', color: '#f093fb', position: 0 },
      { id: '2', color: '#f5576c', position: 100 },
    ],
  },
  {
    type: 'linear',
    angle: 90,
    stops: [
      { id: '1', color: '#4facfe', position: 0 },
      { id: '2', color: '#00f2fe', position: 100 },
    ],
  },
  {
    type: 'linear',
    angle: 90,
    stops: [
      { id: '1', color: '#43e97b', position: 0 },
      { id: '2', color: '#38f9d7', position: 100 },
    ],
  },
  {
    type: 'linear',
    angle: 90,
    stops: [
      { id: '1', color: '#fa709a', position: 0 },
      { id: '2', color: '#fee140', position: 100 },
    ],
  },
  {
    type: 'linear',
    angle: 135,
    stops: [
      { id: '1', color: '#a8edea', position: 0 },
      { id: '2', color: '#fed6e3', position: 100 },
    ],
  },
  {
    type: 'linear',
    angle: 90,
    stops: [
      { id: '1', color: '#ff0844', position: 0 },
      { id: '2', color: '#ffb199', position: 100 },
    ],
  },
  {
    type: 'radial',
    angle: 0,
    stops: [
      { id: '1', color: '#ffecd2', position: 0 },
      { id: '2', color: '#fcb69f', position: 100 },
    ],
  },
];
