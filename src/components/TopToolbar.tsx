import React from 'react';
import { Play, Square, Download, Sliders, Video, Mic } from 'lucide-react';

interface TopToolbarProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  onExport: () => void;
}

/**
 * Apple-inspired minimalist top toolbar mimicking Pixelmator Pro / Pages interface layouts.
 */
export const TopToolbar: React.FC<TopToolbarProps> = ({ isRecording, onStart, onStop, onExport }) => {
  return (
    <div style={styles.toolbar}>
      {/* Left Window Status / App Identity */}
      <div style={styles.appTitleSection}>
        <div style={styles.windowDot} />
        <span style={styles.titleText}>Studio Pulse</span>
      </div>

      {/* Center Controls - Action Triggers */}
      <div style={styles.centerControls}>
        {!isRecording ? (
          <button onClick={onStart} style={{ ...styles.actionButton, ...styles.recordBtn }}>
            <Video size={16} />
            <span>Record Session</span>
          </button>
        ) : (
          <button onClick={onStop} style={{ ...styles.actionButton, ...styles.stopBtn }}>
            <Square size={14} fill="currentColor" />
            <span>Stop Recording</span>
          </button>
        )}
      </div>

      {/* Right Controls - Utility & Export */}
      <div style={styles.rightControls}>
        <button onClick={onExport} style={styles.utilityButton}>
          <Download size={16} />
          <span>Export MP4</span>
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '52px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '0 16px',
    userSelect: 'none'
  },
  appTitleSection: { display: 'flex', alignItems: 'center', gap: '8px' },
  windowDot: { width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' },
  titleText: { fontSize: '13px', fontWeight: 600, color: '#1D1D1F', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
  centerControls: { display: 'flex', gap: '8px' },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    fontFamily: '-apple-system, sans-serif'
  },
  recordBtn: { backgroundColor: '#0071E3', color: '#FFFFFF' },
  stopBtn: { backgroundColor: '#FF3B30', color: '#FFFFFF' },
  rightControls: { display: 'flex', alignItems: 'center' },
  utilityButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#1D1D1F',
    cursor: 'pointer',
    fontWeight: 500
  }
};
