// Named CSS Colors
export interface NamedColor {
  name: string;
  hex: string;
  category: string;
}

export const namedColors: NamedColor[] = [
  // Reds
  { name: 'Indian Red', hex: '#CD5C5C', category: 'red' },
  { name: 'Light Coral', hex: '#F08080', category: 'red' },
  { name: 'Salmon', hex: '#FA8072', category: 'red' },
  { name: 'Dark Salmon', hex: '#E9967A', category: 'red' },
  { name: 'Light Salmon', hex: '#FFA07A', category: 'red' },
  { name: 'Crimson', hex: '#DC143C', category: 'red' },
  { name: 'Red', hex: '#FF0000', category: 'red' },
  { name: 'Fire Brick', hex: '#B22222', category: 'red' },
  { name: 'Dark Red', hex: '#8B0000', category: 'red' },
  
  // Pinks
  { name: 'Pink', hex: '#FFC0CB', category: 'pink' },
  { name: 'Light Pink', hex: '#FFB6C1', category: 'pink' },
  { name: 'Hot Pink', hex: '#FF69B4', category: 'pink' },
  { name: 'Deep Pink', hex: '#FF1493', category: 'pink' },
  { name: 'Medium Violet Red', hex: '#C71585', category: 'pink' },
  { name: 'Pale Violet Red', hex: '#DB7093', category: 'pink' },
  
  // Oranges
  { name: 'Coral', hex: '#FF7F50', category: 'orange' },
  { name: 'Tomato', hex: '#FF6347', category: 'orange' },
  { name: 'Orange Red', hex: '#FF4500', category: 'orange' },
  { name: 'Dark Orange', hex: '#FF8C00', category: 'orange' },
  { name: 'Orange', hex: '#FFA500', category: 'orange' },
  
  // Yellows
  { name: 'Gold', hex: '#FFD700', category: 'yellow' },
  { name: 'Yellow', hex: '#FFFF00', category: 'yellow' },
  { name: 'Light Yellow', hex: '#FFFFE0', category: 'yellow' },
  { name: 'Lemon Chiffon', hex: '#FFFACD', category: 'yellow' },
  { name: 'Light Goldenrod Yellow', hex: '#FAFAD2', category: 'yellow' },
  { name: 'Papaya Whip', hex: '#FFEFD5', category: 'yellow' },
  { name: 'Moccasin', hex: '#FFE4B5', category: 'yellow' },
  { name: 'Peach Puff', hex: '#FFDAB9', category: 'yellow' },
  { name: 'Pale Goldenrod', hex: '#EEE8AA', category: 'yellow' },
  { name: 'Khaki', hex: '#F0E68C', category: 'yellow' },
  { name: 'Dark Khaki', hex: '#BDB76B', category: 'yellow' },
  
  // Purples
  { name: 'Lavender', hex: '#E6E6FA', category: 'purple' },
  { name: 'Thistle', hex: '#D8BFD8', category: 'purple' },
  { name: 'Plum', hex: '#DDA0DD', category: 'purple' },
  { name: 'Violet', hex: '#EE82EE', category: 'purple' },
  { name: 'Orchid', hex: '#DA70D6', category: 'purple' },
  { name: 'Fuchsia', hex: '#FF00FF', category: 'purple' },
  { name: 'Magenta', hex: '#FF00FF', category: 'purple' },
  { name: 'Medium Orchid', hex: '#BA55D3', category: 'purple' },
  { name: 'Medium Purple', hex: '#9370DB', category: 'purple' },
  { name: 'Rebecca Purple', hex: '#663399', category: 'purple' },
  { name: 'Blue Violet', hex: '#8A2BE2', category: 'purple' },
  { name: 'Dark Violet', hex: '#9400D3', category: 'purple' },
  { name: 'Dark Orchid', hex: '#9932CC', category: 'purple' },
  { name: 'Dark Magenta', hex: '#8B008B', category: 'purple' },
  { name: 'Purple', hex: '#800080', category: 'purple' },
  { name: 'Indigo', hex: '#4B0082', category: 'purple' },
  { name: 'Slate Blue', hex: '#6A5ACD', category: 'purple' },
  { name: 'Dark Slate Blue', hex: '#483D8B', category: 'purple' },
  
  // Greens
  { name: 'Green Yellow', hex: '#ADFF2F', category: 'green' },
  { name: 'Chartreuse', hex: '#7FFF00', category: 'green' },
  { name: 'Lawn Green', hex: '#7CFC00', category: 'green' },
  { name: 'Lime', hex: '#00FF00', category: 'green' },
  { name: 'Lime Green', hex: '#32CD32', category: 'green' },
  { name: 'Pale Green', hex: '#98FB98', category: 'green' },
  { name: 'Light Green', hex: '#90EE90', category: 'green' },
  { name: 'Medium Spring Green', hex: '#00FA9A', category: 'green' },
  { name: 'Spring Green', hex: '#00FF7F', category: 'green' },
  { name: 'Medium Sea Green', hex: '#3CB371', category: 'green' },
  { name: 'Sea Green', hex: '#2E8B57', category: 'green' },
  { name: 'Forest Green', hex: '#228B22', category: 'green' },
  { name: 'Green', hex: '#008000', category: 'green' },
  { name: 'Dark Green', hex: '#006400', category: 'green' },
  { name: 'Yellow Green', hex: '#9ACD32', category: 'green' },
  { name: 'Olive Drab', hex: '#6B8E23', category: 'green' },
  { name: 'Olive', hex: '#808000', category: 'green' },
  { name: 'Dark Olive Green', hex: '#556B2F', category: 'green' },
  { name: 'Medium Aquamarine', hex: '#66CDAA', category: 'green' },
  { name: 'Dark Sea Green', hex: '#8FBC8B', category: 'green' },
  { name: 'Light Sea Green', hex: '#20B2AA', category: 'green' },
  { name: 'Dark Cyan', hex: '#008B8B', category: 'green' },
  { name: 'Teal', hex: '#008080', category: 'green' },
  
  // Blues
  { name: 'Aqua', hex: '#00FFFF', category: 'blue' },
  { name: 'Cyan', hex: '#00FFFF', category: 'blue' },
  { name: 'Light Cyan', hex: '#E0FFFF', category: 'blue' },
  { name: 'Pale Turquoise', hex: '#AFEEEE', category: 'blue' },
  { name: 'Aquamarine', hex: '#7FFFD4', category: 'blue' },
  { name: 'Turquoise', hex: '#40E0D0', category: 'blue' },
  { name: 'Medium Turquoise', hex: '#48D1CC', category: 'blue' },
  { name: 'Dark Turquoise', hex: '#00CED1', category: 'blue' },
  { name: 'Cadet Blue', hex: '#5F9EA0', category: 'blue' },
  { name: 'Steel Blue', hex: '#4682B4', category: 'blue' },
  { name: 'Light Steel Blue', hex: '#B0C4DE', category: 'blue' },
  { name: 'Powder Blue', hex: '#B0E0E6', category: 'blue' },
  { name: 'Light Blue', hex: '#ADD8E6', category: 'blue' },
  { name: 'Sky Blue', hex: '#87CEEB', category: 'blue' },
  { name: 'Light Sky Blue', hex: '#87CEFA', category: 'blue' },
  { name: 'Deep Sky Blue', hex: '#00BFFF', category: 'blue' },
  { name: 'Dodger Blue', hex: '#1E90FF', category: 'blue' },
  { name: 'Cornflower Blue', hex: '#6495ED', category: 'blue' },
  { name: 'Medium Slate Blue', hex: '#7B68EE', category: 'blue' },
  { name: 'Royal Blue', hex: '#4169E1', category: 'blue' },
  { name: 'Blue', hex: '#0000FF', category: 'blue' },
  { name: 'Medium Blue', hex: '#0000CD', category: 'blue' },
  { name: 'Dark Blue', hex: '#00008B', category: 'blue' },
  { name: 'Navy', hex: '#000080', category: 'blue' },
  { name: 'Midnight Blue', hex: '#191970', category: 'blue' },
  
  // Browns
  { name: 'Cornsilk', hex: '#FFF8DC', category: 'brown' },
  { name: 'Blanched Almond', hex: '#FFEBCD', category: 'brown' },
  { name: 'Bisque', hex: '#FFE4C4', category: 'brown' },
  { name: 'Navajo White', hex: '#FFDEAD', category: 'brown' },
  { name: 'Wheat', hex: '#F5DEB3', category: 'brown' },
  { name: 'Burly Wood', hex: '#DEB887', category: 'brown' },
  { name: 'Tan', hex: '#D2B48C', category: 'brown' },
  { name: 'Rosy Brown', hex: '#BC8F8F', category: 'brown' },
  { name: 'Sandy Brown', hex: '#F4A460', category: 'brown' },
  { name: 'Goldenrod', hex: '#DAA520', category: 'brown' },
  { name: 'Dark Goldenrod', hex: '#B8860B', category: 'brown' },
  { name: 'Peru', hex: '#CD853F', category: 'brown' },
  { name: 'Chocolate', hex: '#D2691E', category: 'brown' },
  { name: 'Saddle Brown', hex: '#8B4513', category: 'brown' },
  { name: 'Sienna', hex: '#A0522D', category: 'brown' },
  { name: 'Brown', hex: '#A52A2A', category: 'brown' },
  { name: 'Maroon', hex: '#800000', category: 'brown' },
  
  // Whites
  { name: 'White', hex: '#FFFFFF', category: 'white' },
  { name: 'Snow', hex: '#FFFAFA', category: 'white' },
  { name: 'Honeydew', hex: '#F0FFF0', category: 'white' },
  { name: 'Mint Cream', hex: '#F5FFFA', category: 'white' },
  { name: 'Azure', hex: '#F0FFFF', category: 'white' },
  { name: 'Alice Blue', hex: '#F0F8FF', category: 'white' },
  { name: 'Ghost White', hex: '#F8F8FF', category: 'white' },
  { name: 'White Smoke', hex: '#F5F5F5', category: 'white' },
  { name: 'Seashell', hex: '#FFF5EE', category: 'white' },
  { name: 'Beige', hex: '#F5F5DC', category: 'white' },
  { name: 'Old Lace', hex: '#FDF5E6', category: 'white' },
  { name: 'Floral White', hex: '#FFFAF0', category: 'white' },
  { name: 'Ivory', hex: '#FFFFF0', category: 'white' },
  { name: 'Antique White', hex: '#FAEBD7', category: 'white' },
  { name: 'Linen', hex: '#FAF0E6', category: 'white' },
  { name: 'Lavender Blush', hex: '#FFF0F5', category: 'white' },
  { name: 'Misty Rose', hex: '#FFE4E1', category: 'white' },
  
  // Grays
  { name: 'Gainsboro', hex: '#DCDCDC', category: 'gray' },
  { name: 'Light Gray', hex: '#D3D3D3', category: 'gray' },
  { name: 'Silver', hex: '#C0C0C0', category: 'gray' },
  { name: 'Dark Gray', hex: '#A9A9A9', category: 'gray' },
  { name: 'Gray', hex: '#808080', category: 'gray' },
  { name: 'Dim Gray', hex: '#696969', category: 'gray' },
  { name: 'Light Slate Gray', hex: '#778899', category: 'gray' },
  { name: 'Slate Gray', hex: '#708090', category: 'gray' },
  { name: 'Dark Slate Gray', hex: '#2F4F4F', category: 'gray' },
  { name: 'Black', hex: '#000000', category: 'gray' },
];

// Color Palettes
export interface ColorPalette {
  name: string;
  description: string;
  colors: { name: string; hex: string; shade?: string }[];
}

export const tailwindPalette: ColorPalette = {
  name: 'Tailwind CSS',
  description: 'Official Tailwind CSS color palette',
  colors: [
    { name: 'Slate', hex: '#64748b', shade: '500' },
    { name: 'Gray', hex: '#6b7280', shade: '500' },
    { name: 'Zinc', hex: '#71717a', shade: '500' },
    { name: 'Neutral', hex: '#737373', shade: '500' },
    { name: 'Stone', hex: '#78716c', shade: '500' },
    { name: 'Red', hex: '#ef4444', shade: '500' },
    { name: 'Orange', hex: '#f97316', shade: '500' },
    { name: 'Amber', hex: '#f59e0b', shade: '500' },
    { name: 'Yellow', hex: '#eab308', shade: '500' },
    { name: 'Lime', hex: '#84cc16', shade: '500' },
    { name: 'Green', hex: '#22c55e', shade: '500' },
    { name: 'Emerald', hex: '#10b981', shade: '500' },
    { name: 'Teal', hex: '#14b8a6', shade: '500' },
    { name: 'Cyan', hex: '#06b6d4', shade: '500' },
    { name: 'Sky', hex: '#0ea5e9', shade: '500' },
    { name: 'Blue', hex: '#3b82f6', shade: '500' },
    { name: 'Indigo', hex: '#6366f1', shade: '500' },
    { name: 'Violet', hex: '#8b5cf6', shade: '500' },
    { name: 'Purple', hex: '#a855f7', shade: '500' },
    { name: 'Fuchsia', hex: '#d946ef', shade: '500' },
    { name: 'Pink', hex: '#ec4899', shade: '500' },
    { name: 'Rose', hex: '#f43f5e', shade: '500' },
  ],
};

export const materialPalette: ColorPalette = {
  name: 'Material Design',
  description: 'Google Material Design color palette',
  colors: [
    { name: 'Red', hex: '#f44336', shade: '500' },
    { name: 'Pink', hex: '#e91e63', shade: '500' },
    { name: 'Purple', hex: '#9c27b0', shade: '500' },
    { name: 'Deep Purple', hex: '#673ab7', shade: '500' },
    { name: 'Indigo', hex: '#3f51b5', shade: '500' },
    { name: 'Blue', hex: '#2196f3', shade: '500' },
    { name: 'Light Blue', hex: '#03a9f4', shade: '500' },
    { name: 'Cyan', hex: '#00bcd4', shade: '500' },
    { name: 'Teal', hex: '#009688', shade: '500' },
    { name: 'Green', hex: '#4caf50', shade: '500' },
    { name: 'Light Green', hex: '#8bc34a', shade: '500' },
    { name: 'Lime', hex: '#cddc39', shade: '500' },
    { name: 'Yellow', hex: '#ffeb3b', shade: '500' },
    { name: 'Amber', hex: '#ffc107', shade: '500' },
    { name: 'Orange', hex: '#ff9800', shade: '500' },
    { name: 'Deep Orange', hex: '#ff5722', shade: '500' },
    { name: 'Brown', hex: '#795548', shade: '500' },
    { name: 'Grey', hex: '#9e9e9e', shade: '500' },
    { name: 'Blue Grey', hex: '#607d8b', shade: '500' },
  ],
};

export const flatUIPalette: ColorPalette = {
  name: 'Flat UI',
  description: 'Popular flat design color palette',
  colors: [
    { name: 'Turquoise', hex: '#1abc9c' },
    { name: 'Emerald', hex: '#2ecc71' },
    { name: 'Peter River', hex: '#3498db' },
    { name: 'Amethyst', hex: '#9b59b6' },
    { name: 'Wet Asphalt', hex: '#34495e' },
    { name: 'Green Sea', hex: '#16a085' },
    { name: 'Nephritis', hex: '#27ae60' },
    { name: 'Belize Hole', hex: '#2980b9' },
    { name: 'Wisteria', hex: '#8e44ad' },
    { name: 'Midnight Blue', hex: '#2c3e50' },
    { name: 'Sun Flower', hex: '#f1c40f' },
    { name: 'Carrot', hex: '#e67e22' },
    { name: 'Alizarin', hex: '#e74c3c' },
    { name: 'Clouds', hex: '#ecf0f1' },
    { name: 'Concrete', hex: '#95a5a6' },
    { name: 'Orange', hex: '#f39c12' },
    { name: 'Pumpkin', hex: '#d35400' },
    { name: 'Pomegranate', hex: '#c0392b' },
    { name: 'Silver', hex: '#bdc3c7' },
    { name: 'Asbestos', hex: '#7f8c8d' },
  ],
};

export const pastelPalette: ColorPalette = {
  name: 'Pastels',
  description: 'Soft, muted pastel colors',
  colors: [
    { name: 'Pastel Pink', hex: '#FFD1DC' },
    { name: 'Pastel Peach', hex: '#FFDAB9' },
    { name: 'Pastel Yellow', hex: '#FFFACD' },
    { name: 'Pastel Green', hex: '#98FB98' },
    { name: 'Pastel Mint', hex: '#98FF98' },
    { name: 'Pastel Blue', hex: '#AEC6CF' },
    { name: 'Pastel Lavender', hex: '#E6E6FA' },
    { name: 'Pastel Purple', hex: '#DDA0DD' },
    { name: 'Pastel Coral', hex: '#FFB7C5' },
    { name: 'Pastel Turquoise', hex: '#AFEEEE' },
    { name: 'Pastel Rose', hex: '#FFE4E1' },
    { name: 'Pastel Cream', hex: '#FFFDD0' },
  ],
};

export const earthTonesPalette: ColorPalette = {
  name: 'Earth Tones',
  description: 'Natural, organic earth colors',
  colors: [
    { name: 'Terracotta', hex: '#E2725B' },
    { name: 'Rust', hex: '#B7410E' },
    { name: 'Burnt Sienna', hex: '#E97451' },
    { name: 'Ochre', hex: '#CC7722' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Moss Green', hex: '#8A9A5B' },
    { name: 'Forest', hex: '#228B22' },
    { name: 'Clay', hex: '#B66A50' },
    { name: 'Sand', hex: '#C2B280' },
    { name: 'Taupe', hex: '#483C32' },
    { name: 'Umber', hex: '#635147' },
    { name: 'Sepia', hex: '#704214' },
  ],
};

export const neonPalette: ColorPalette = {
  name: 'Neon',
  description: 'Vibrant, electric neon colors',
  colors: [
    { name: 'Neon Pink', hex: '#FF6EC7' },
    { name: 'Neon Magenta', hex: '#FF00FF' },
    { name: 'Neon Red', hex: '#FF3131' },
    { name: 'Neon Orange', hex: '#FF5F1F' },
    { name: 'Neon Yellow', hex: '#FFFF00' },
    { name: 'Neon Green', hex: '#39FF14' },
    { name: 'Neon Cyan', hex: '#00FFFF' },
    { name: 'Neon Blue', hex: '#1F51FF' },
    { name: 'Neon Purple', hex: '#BC13FE' },
    { name: 'Electric Blue', hex: '#7DF9FF' },
    { name: 'Hot Pink', hex: '#FF69B4' },
    { name: 'Lime', hex: '#BFFF00' },
  ],
};

export const vintagePalette: ColorPalette = {
  name: 'Vintage',
  description: 'Retro and nostalgic color tones',
  colors: [
    { name: 'Dusty Rose', hex: '#DCAE96' },
    { name: 'Sage', hex: '#9CAF88' },
    { name: 'Mustard', hex: '#FFDB58' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Burnt Orange', hex: '#CC5500' },
    { name: 'Olive Drab', hex: '#6B8E23' },
    { name: 'Mauve', hex: '#E0B0FF' },
    { name: 'Cream', hex: '#FFFDD0' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Copper', hex: '#B87333' },
    { name: 'Plum', hex: '#8E4585' },
  ],
};

export const allPalettes: ColorPalette[] = [
  tailwindPalette,
  materialPalette,
  flatUIPalette,
  pastelPalette,
  earthTonesPalette,
  neonPalette,
  vintagePalette,
];

// Color Categories
export type CategoryId = 'all' | 'red' | 'pink' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown' | 'gray' | 'white';

export interface ColorCategory {
  id: CategoryId;
  name: string;
  color: string;
}

export const colorCategories: ColorCategory[] = [
  { id: 'all', name: 'All Colors', color: '#000000' },
  { id: 'red', name: 'Reds', color: '#EF4444' },
  { id: 'pink', name: 'Pinks', color: '#EC4899' },
  { id: 'orange', name: 'Oranges', color: '#F97316' },
  { id: 'yellow', name: 'Yellows', color: '#EAB308' },
  { id: 'green', name: 'Greens', color: '#22C55E' },
  { id: 'blue', name: 'Blues', color: '#3B82F6' },
  { id: 'purple', name: 'Purples', color: '#A855F7' },
  { id: 'brown', name: 'Browns', color: '#A16207' },
  { id: 'gray', name: 'Grays', color: '#6B7280' },
  { id: 'white', name: 'Whites', color: '#F3F4F6' },
];

// Popular/Trending Colors
export interface TrendingColor {
  name: string;
  hex: string;
  description: string;
  year?: number;
}

export const trendingColors: TrendingColor[] = [
  { name: 'Pantone Peach Fuzz', hex: '#FFBE98', description: 'Color of the Year 2024', year: 2024 },
  { name: 'Viva Magenta', hex: '#BB2649', description: 'Color of the Year 2023', year: 2023 },
  { name: 'Very Peri', hex: '#6667AB', description: 'Color of the Year 2022', year: 2022 },
  { name: 'Ultimate Gray', hex: '#939597', description: 'Color of the Year 2021', year: 2021 },
  { name: 'Illuminating', hex: '#F5DF4D', description: 'Color of the Year 2021', year: 2021 },
  { name: 'Classic Blue', hex: '#0F4C81', description: 'Color of the Year 2020', year: 2020 },
  { name: 'Living Coral', hex: '#FF6F61', description: 'Color of the Year 2019', year: 2019 },
  { name: 'Gen Z Yellow', hex: '#F5E050', description: 'Popular with Gen Z', },
  { name: 'Millennial Pink', hex: '#F3CFC6', description: 'Iconic millennial color' },
  { name: 'Sage Green', hex: '#9CAF88', description: 'Trending in interiors' },
  { name: 'Lavender Haze', hex: '#B4A7D6', description: 'Soft and calming' },
  { name: 'Butter Yellow', hex: '#FFFDD0', description: 'Warm and inviting' },
];

// Brand Colors
export interface BrandColor {
  brand: string;
  colors: { name: string; hex: string }[];
}

export const brandColors: BrandColor[] = [
  {
    brand: 'Google',
    colors: [
      { name: 'Blue', hex: '#4285F4' },
      { name: 'Red', hex: '#DB4437' },
      { name: 'Yellow', hex: '#F4B400' },
      { name: 'Green', hex: '#0F9D58' },
    ],
  },
  {
    brand: 'Facebook',
    colors: [
      { name: 'Blue', hex: '#1877F2' },
      { name: 'Light Blue', hex: '#E7F3FF' },
    ],
  },
  {
    brand: 'Twitter/X',
    colors: [
      { name: 'Blue', hex: '#1DA1F2' },
      { name: 'Black', hex: '#14171A' },
    ],
  },
  {
    brand: 'Instagram',
    colors: [
      { name: 'Purple', hex: '#833AB4' },
      { name: 'Pink', hex: '#E1306C' },
      { name: 'Orange', hex: '#F77737' },
    ],
  },
  {
    brand: 'Spotify',
    colors: [
      { name: 'Green', hex: '#1DB954' },
      { name: 'Black', hex: '#191414' },
    ],
  },
  {
    brand: 'Netflix',
    colors: [
      { name: 'Red', hex: '#E50914' },
      { name: 'Black', hex: '#000000' },
    ],
  },
  {
    brand: 'Slack',
    colors: [
      { name: 'Purple', hex: '#4A154B' },
      { name: 'Blue', hex: '#36C5F0' },
      { name: 'Green', hex: '#2EB67D' },
      { name: 'Yellow', hex: '#ECB22E' },
      { name: 'Red', hex: '#E01E5A' },
    ],
  },
  {
    brand: 'Discord',
    colors: [
      { name: 'Blurple', hex: '#5865F2' },
      { name: 'Green', hex: '#57F287' },
      { name: 'Yellow', hex: '#FEE75C' },
      { name: 'Fuchsia', hex: '#EB459E' },
      { name: 'Red', hex: '#ED4245' },
    ],
  },
];
