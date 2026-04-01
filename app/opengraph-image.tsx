import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Standard OpenGraph sizing
export const alt = 'Sandeep Reddy Reddy - Senior Software Engineer';
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
          background: 'linear-gradient(to bottom right, #0B0F19, #1E2A45)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: '80px',
              fontFamily: 'sans-serif',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              textAlign: 'center',
              color: '#F1F5F9'
            }}
          >
            Sandeep Reddy Reddy
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: '#94A3B8',
              fontFamily: 'sans-serif',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Senior Software Engineer<br/>
            AI / Security / GRC | Full Stack & Cloud Engineering
          </p>
          <div
            style={{
              marginTop: '50px',
              display: 'flex',
              padding: '16px 32px',
              border: '2px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '100px',
              background: 'rgba(59, 130, 246, 0.1)',
            }}
          >
            <span style={{ fontSize: '24px', color: '#60A5FA', fontWeight: 600 }}>
              8+ Years @ IBM  •  2× Patent Inventor
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
