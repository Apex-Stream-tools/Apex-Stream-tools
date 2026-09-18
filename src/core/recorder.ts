export interface RecorderConfig {
  enableScreen: boolean;
  enableAudio: boolean;
  frameRate?: number;
}

/**
 * Orchestrates client-side screen and audio recording using Native Browser APIs.
 */
export class StudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private activeStream: MediaStream | null = null;

  /**
   * Requests permission and starts capturing selected media streams.
   */
  async start(config: RecorderConfig): Promise<MediaStream> {
    try {
      const streamsToCombine: MediaStreamTrack[] = [];

      // 1. Capture screen and system audio if enabled
      if (config.enableScreen) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: { frameRate: config.frameRate || 60 },
          audio: true
        });
        screenStream.getTracks().forEach(track => streamsToCombine.push(track));
      }

      // 2. Capture microphone voice audio if enabled
      if (config.enableAudio) {
        const voiceStream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true }
        });
        voiceStream.getAudioTracks().forEach(track => streamsToCombine.push(track));
      }

      // 3. Consolidate tracks into a single stream orchestration
      this.activeStream = new MediaStream(streamsToCombine);
      this.setupMediaRecorder(this.activeStream);
      
      return this.activeStream;
    } catch (error) {
      console.error("❌ Failed to initiate studio capture streams:", error);
      throw error;
    }
  }

  /**
   * Initializes the browser's MediaRecorder with high-quality encoding standards.
   */
  private setupMediaRecorder(stream: MediaStream): void {
    this.recordedChunks = [];
    
    // Fallback chain for optimal browser video container formats
    const options = { mimeType: 'video/webm;codecs=vp9,opus' };
    this.mediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };
  }

  /**
   * Stops recording and returns the final compiled Blob video package.
   */
  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        return resolve(new Blob([], { type: 'video/webm' }));
      }

      this.mediaRecorder.onstop = () => {
        const finalVideoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
        
        // Safely kill all hardware stream tracks (camera lights turn off, screen-share icon goes away)
        if (this.activeStream) {
          this.activeStream.getTracks().forEach(track => track.stop());
        }
        
        console.log(`🎬 Recording finalized successfully. Total Size: ${finalVideoBlob.size} bytes`);
        resolve(finalVideoBlob);
      };

      this.mediaRecorder.stop();
    });
  }
}
