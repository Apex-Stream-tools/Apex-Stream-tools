import React from 'react';

interface StageCanvasProps {
  stream: MediaStream | null;
}

/**
 * Minimalist canvas viewport area mirroring professional Apple creation environments.
 */
export const StageCanvas: React.FC<StageCanvasProps> = ({ stream }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div style={styles.stage}>
      <div style={styles.viewport}>
        {stream ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            style={styles.mediaElement} 
          />
        ) : (
          <div style={styles.placeholder}>
            <div style={styles.lensGraphic} />
            <p style={styles.placeholderText}>No Active Composition</p>
            <p style={styles.subtext}>Trigger the stream recording command from the toolbar above to initialize hardware canvas pipeline assets.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  stage: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark velvet background to elevate content perception
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
    height: 'calc(100vh - 52px)',
    boxSizing: 'border-box'
  },
  viewport: {
    width: '100%',
    height: '100%',
    maxWidth: '960px',
    maxHeight: '540px',
    backgroundColor: '#000000',
    borderRadius: '12px',
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  mediaElement: { width: '100%', height: '100%', objectFit: 'contain' },
  placeholder: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '0 40px', textAlign: 'center' },
  lensGraphic: { width: '48px', height: '48px', borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.2)' },
  placeholderText: { fontSize: '14px', fontWeight: 500, color: '#E3E3E6', margin: 0, fontFamily: '-apple-system, sans-serif' },
  subtext: { fontSize: '11px', color: '#86868B', maxWidth: '340px', margin: 0, lineHeight: '1.5' }
};
