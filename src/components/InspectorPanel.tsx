import React from 'react';
import { Sliders, Shield, Info } from 'lucide-react';

interface InspectorPanelProps {
  frameRate: number;
  setFrameRate: (fps: number) => void;
  noiseSuppression: boolean;
  setNoiseSuppression: (active: boolean) => void;
}

/**
 * Sidebar Inspector properties panel mimicking macOS professional workflows.
 */
export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  frameRate,
  setFrameRate,
  noiseSuppression,
  setNoiseSuppression
}) => {
  return (
    <div style={styles.inspector}>
      <div style={styles.header}>
        <Sliders size={14} />
        <span style={styles.headerText}>Format Inspector</span>
      </div>

      {/* Section: Video Configurations */}
      <div style={styles.section}>
        <label style={styles.label}>Video Capture Quality</label>
        <select 
          value={frameRate} 
          onChange={(e) => setFrameRate(Number(e.target.value))} 
          style={styles.dropdown}
        >
          <option value={30}>ProRes 1080p (30 fps)</option>
          <option value={60}>Cinematic Ultra HD (60 fps)</option>
        </select>
      </div>

      {/* Section: Audio Enhancement */}
      <div style={styles.section}>
        <label style={styles.label}>Audio Core Processing</label>
        <div style={styles.toggleRow}>
          <span style={styles.settingDescription}>Isolate Background Noise</span>
          <input 
            type="checkbox" 
            checked={noiseSuppression}
            onChange={(e) => setNoiseSuppression(e.target.checked)}
            style={styles.toggle}
          />
        </div>
      </div>

      {/* Infrastructure Node Badge */}
      <div style={styles.footerNote}>
        <Info size={14} color="#86868B" />
        <span style={styles.footerText}>Processing is executed entirely on local hardware using high-performance sandboxed WebAssembly engines.</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  inspector: {
    width: '280px',
    backgroundColor: 'rgba(250, 250, 252, 0.85)',
    backdropFilter: 'blur(30px)',
    borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    height: 'calc(100vh - 52px)',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
  },
  header: { display: 'flex', alignItems: 'center', gap: '8px', color: '#1D1D1F', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' },
  headerText: { fontSize: '13px', fontWeight: 600 },
  section: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '11px', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.5px' },
  dropdown: {
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '5px',
    padding: '6px 8px',
    fontSize: '12px',
    color: '#1D1D1F',
    outline: 'none'
  },
  toggleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  settingDescription: { fontSize: '12px', color: '#1D1D1F' },
  toggle: { width: '32px', height: '16px', cursor: 'pointer' },
  footerNote: { marginTop: 'auto', display: 'flex', gap: '8px', backgroundColor: 'rgba(0,0,0,0.03)', padding: '10px', borderRadius: '8px' },
  footerText: { fontSize: '11px', color: '#86868B', lineHeight: '1.4' }
};
