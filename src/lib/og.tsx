import { ImageResponse } from 'next/og';
import { OG_IMAGE } from '@/lib/site';

export const OG_SIZE = { width: OG_IMAGE.width, height: OG_IMAGE.height };

/**
 * The one social-card template, shared by the root opengraph-image and the
 * per-route ones so every card stays on-system. Satori rules apply: every
 * multi-child element needs display:flex, and no conic-gradient.
 */
export function ogCard(headline: string, sub: string) {
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
            {headline}
          </div>
          <div style={{ fontSize: '30px', color: '#56544f' }}>{sub}</div>
        </div>

        <div style={{ fontSize: '24px', color: '#8b8881' }}>
          spectrum.punds.ch · No account · No uploads
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
