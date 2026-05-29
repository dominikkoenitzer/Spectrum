import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          background:
            'linear-gradient(135deg, #e5484d, #f0a93b, #e8c84b, #4ca85e, #3b82c4, #7c5cdb)',
        }}
      />
    ),
    {
      ...size,
    }
  );
}
