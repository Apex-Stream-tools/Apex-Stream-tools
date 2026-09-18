import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

/**
 * Handles professional-grade video processing on the client side via WebAssembly.
 */
export class MediaTranscoder {
  private ffmpeg: FFmpeg;
  private isLoaded: boolean = false;

  constructor() {
    this.ffmpeg = new FFmpeg();
  }

  /**
   * Asynchronously loads WebAssembly multi-threaded processing binaries into the browser worker.
   */
  async initEngine(): Promise<void> {
    if (this.isLoaded) return;

    try {
      console.log("🔄 Loading isolated WebAssembly computing engine...");
      // Loads FFmpeg from standard secure content delivery networks
      await this.ffmpeg.load({
        coreURL: 'https://unpkg.com',
        wasmURL: 'https://unpkg.com'
      });
      
      this.isLoaded = true;
      console.log("🚀 WebAssembly computing layers fully active.");
    } catch (error) {
      console.error("❌ Critical error bootstrapping WebAssembly engine:", error);
      throw error;
    }
  }

  /**
   * Compiles and converts a WebM browser recording into a highly-compatible MP4 file.
   */
  async convertToMp4(inputBlob: Blob): Promise<Blob> {
    if (!this.isLoaded) await this.initEngine();

    const inputName = 'input.webm';
    const outputName = 'output.mp4';

    // 1. Write the raw blob data straight into FFmpeg's virtual WASM file system
    await this.ffmpeg.writeFile(inputName, await fetchFile(inputBlob));

    console.log("⚡ Transcoding to standard H.264 video format...");
    // 2. Execute native FFmpeg CLI flags without standard server workloads
    await this.ffmpeg.exec(['-i', inputName, '-c:v', 'libx264', '-preset', 'fast', outputName]);

    // 3. Read back the processed bytes from the virtual file system
    const data = await this.ffmpeg.readFile(outputName);
    
    // 4. Cleanup internal memory instances
    await this.ffmpeg.deleteFile(inputName);
    await this.ffmpeg.deleteFile(outputName);

    return new Blob([data], { type: 'video/mp4' });
  }
}
