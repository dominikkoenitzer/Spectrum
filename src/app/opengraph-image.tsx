import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Spectrum - Advanced Color Tools';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
          }}
        >
          Spectrum
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Advanced Color Tools & Picker
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
