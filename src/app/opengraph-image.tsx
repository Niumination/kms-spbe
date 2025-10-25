import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'KMS SPBE - Platform Manajemen Pengetahuan Pemerintah';
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
          fontSize: 60,
          background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#1f2937',
            }}
          >
            KMS SPBE
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#4b5563',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            Sistem Manajemen Pengetahuan Pemerintah Digital
          </div>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '40px',
              fontSize: 24,
              color: '#6b7280',
            }}
          >
            <span>📚 Dokumentasi</span>
            <span>🔒 Aman</span>
            <span>🤝 Kolaboratif</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
