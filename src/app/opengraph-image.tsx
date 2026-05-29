import { ImageResponse } from 'next/og';

export const alt = 'Spectrum — Free color tools for designers and developers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#e8e6e2',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background:
                'linear-gradient(135deg, #ff5d5d, #ffb24d, #ffe24d, #57d97f, #4db6ff, #9b6bff, #ff5db4)',
            }}
          />
          <div style={{ fontSize: '42px', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.02em' }}>
            Spectrum
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '78px',
              fontWeight: 800,
              color: '#1b1b1d',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              maxWidth: '940px',
            }}
          >
            Free color tools that run in your browser.
          </div>
          <div style={{ fontSize: '30px', color: '#56544f' }}>
            Pick · Convert · Contrast · Palettes · Gradients · Vision
          </div>
        </div>

        <div style={{ fontSize: '24px', color: '#8b8881' }}>
          spectrumcolor.app · No account · No uploads
        </div>
      </div>
    ),
    { ...size },
  );
}
