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
            'linear-gradient(135deg, #ff5d5d, #ffb24d, #ffe24d, #57d97f, #4db6ff, #9b6bff, #ff5db4)',
        }}
      />
    ),
    {
      ...size,
    }
  );
}
