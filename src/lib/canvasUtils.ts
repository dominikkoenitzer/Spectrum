export function loadImageToCanvas(
  source: string | File,
  canvas: HTMLCanvasElement,
  maxSize: number = 4000
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // Validate image dimensions
      if (width === 0 || height === 0) {
        reject(new Error('Invalid image dimensions'));
        return;
      }
      
      if (width > 16384 || height > 16384) {
        reject(new Error('Image too large (max 16384px)'));
        return;
      }
      
      // Scale down if image is too large
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Revoke object URL if it was created
      if (typeof source !== 'string' || source.startsWith('blob:')) {
        URL.revokeObjectURL(img.src);
      }
      
      resolve();
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image. The image might be blocked by CORS policy.'));
      if (typeof source !== 'string' || source.startsWith('blob:')) {
        URL.revokeObjectURL(img.src);
      }
    };
    
    if (typeof source === 'string') {
      // Check if it's an external URL
      if (source.startsWith('http://') || source.startsWith('https://')) {
        img.crossOrigin = 'anonymous';
      }
      img.src = source;
    } else {
      img.src = URL.createObjectURL(source);
    }
  });
}

export function getPixelColor(
  canvas: HTMLCanvasElement,
  x: number,
  y: number
): { r: number; g: number; b: number; a: number } | null {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  
  // Ensure coordinates are within bounds
  const clampedX = Math.max(0, Math.min(x, canvas.width - 1));
  const clampedY = Math.max(0, Math.min(y, canvas.height - 1));
  
  const pixel = ctx.getImageData(clampedX, clampedY, 1, 1).data;
  
  return {
    r: pixel[0],
    g: pixel[1],
    b: pixel[2],
    a: pixel[3] / 255,
  };
}

export function getCanvasCoordinates(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  return {
    x: Math.floor((clientX - rect.left) * scaleX),
    y: Math.floor((clientY - rect.top) * scaleY),
  };
}

export function getZoomRegion(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  size: number = 11
): ImageData | null {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  
  const halfSize = Math.floor(size / 2);
  const startX = Math.max(0, x - halfSize);
  const startY = Math.max(0, y - halfSize);
  
  // Adjust size if near edges
  const actualWidth = Math.min(size, canvas.width - startX);
  const actualHeight = Math.min(size, canvas.height - startY);
  
  if (actualWidth <= 0 || actualHeight <= 0) return null;
  
  return ctx.getImageData(startX, startY, actualWidth, actualHeight);
}
