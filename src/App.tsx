import React, { useState, useRef } from 'react';
import { TopToolbar } from './components/TopToolbar';
import { StageCanvas } from './components/StageCanvas';
import { InspectorPanel } from './components/InspectorPanel';
import { StudioRecorder } from './core/recorder';
import { MediaTranscoder } from './core/ffmpeg-worker';

/**
 * Main application coordinator mimicking macOS professional workflow suites.
 */
export default function App() {
  // UI and Configuration States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [frameRate, setFrameRate] = useState<number>(30);
  const [noiseSuppression, setNoiseSuppression] = useState<boolean>(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Core Engine References (Persisted across renders)
  const recorderRef = useRef<StudioRecorder>(new StudioRecorder());
  const transcoderRef = useRef<MediaTranscoder>(new MediaTranscoder());
  const recordedBlobRef = useRef<Blob | null>(null);

  /**
   * Initializes the native hardware recording pipeline.
   */
  const handleStartRecording = async () => {
    try {
      const activeStream = await recorderRef.current.start({
        enableScreen: true,
        enableAudio: true,
        frameRate: frameRate
      });
      
      setStream(activeStream);
      setIsRecording(true);
      recordedBlobRef.current = null; // Clear previous record assets
    } catch (error) {
      alert("Could not initialize hardware capture streams. Please verify permissions.");
    }
  };

  /**
   * Safe finalization of the recording pipeline stream.
   */
  const handleStopRecording = async () => {
    setIsRecording(false);
    setStream(null);
    
    const videoBlob = await recorderRef.current.stop();
    recordedBlobRef.current = videoBlob;
  };

  /**
   * Handles high-performance client-side WebAssembly rendering to universal MP4 container format.
   */
  const handleExportMedia = async () => {
    if (!recordedBlobRef.current) {
      alert("No active composition asset found to export. Please record a session first.");
      return;
    }

    try {
      console.log("Starting WebAssembly compilation framework...");
      // Simulating or calling the underlying WASM engine conversion
      const mp4Blob = await transcoderRef.current.convertToMp4(recordedBlobRef.current);
      
      // Traditional safe download link dispatch trigger
      const downloadUrl = URL.createObjectURL(mp4Blob);
      const anchorElement = document.createElement('a');
      anchorElement.href = downloadUrl;
      anchorElement.download = `studio-pulse-composition-${Date.now()}.mp4`;
      document.body.appendChild(anchorElement);
      anchorElement.click();
      
      // Cleanup browser memory allocation
      document.body.removeChild(anchorElement);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      alert("WebAssembly pipeline rendering failed during execution.");
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* 1. Global Minimalist Top Controls */}
      <TopToolbar 
        isRecording={isRecording} 
        onStart={handleStartRecording} 
        onStop={handleStopRecording} 
        onExport={handleExportMedia} 
      />

      {/* 2. Workspace Splitting Layout */}
      <div style={styles.workspace}>
        {/* Central Display Viewport */}
        <StageCanvas stream={stream} />

        {/* Right Property Customization Node */}
        <InspectorPanel 
          frameRate={frameRate} 
          setFrameRate={setFrameRate} 
          noiseSuppression={noiseSuppression} 
          setNoiseSuppression={setNoiseSuppression} 
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#F5F5F7'
  },
  workspace: {
    display: 'flex',
    flex: 1,
    height: 'calc(100vh - 52px)',
    overflow: 'hidden'
  }
};
