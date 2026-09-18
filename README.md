<div align="center">
  If you like our projects and resources, please sponsor us!.
</div>

<div align="center">
  ![Texto Alternativo](<img width="424" height="425" alt="image" src="https://github.com/user-attachments/assets/6123fd74-2f34-4a2e-9fec-99a87e1f8de0" />
)
</div>


<div align="center">
  ## 🎬 Apex Stream.
</div>

An elite, open-source, web-based creator studio engineered to mimic premium macOS design suites like *Pages*, *Final Cut Pro*, and *Pixelmator Pro*. Record high-quality workspace streams, manipulate parameters through an elegant context-driven inspector, and compile media directly on local hardware via **WebAssembly** and **FFmpeg.wasm**.

**Zero Server Infrastructure. Zero Costs. Absolute Privacy.**

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/66f6370f-b2b6-40e7-822c-41e50e4b8ffb" />

---

## ✨ System Architecture Features

- **Apple-Inspired UX/UI:** Designed with deep velvet viewports, structural glassmorphism, and a context-aware properties panel (*Format Inspector*).
- **Edge Computing (Serverless Rendering):** Media files are compiled, remuxed, and encoded straight inside a sandboxed browser Worker using **FFmpeg compiled to WebAssembly**.
- **Synchronized Audio Core:** Built-in hardware isolation logic supporting echo cancellation, noise suppression, and simultaneous system-plus-microphone capture pipelines.
- **Global Deployment Readiness:** Fully containerized architecture using **Vite**, **TypeScript**, and modular component lifecycles.

---

## 📂 Repository Blueprint

```text
studio-pulse/
├── src/
│   ├── core/                  # Core engineering & sandboxed WASM runners
│   │   ├── ffmpeg-worker.ts   # Client-side video encoding pipeline
│   │   └── recorder.ts        # Native MediaRecorder stream supervisor
│   ├── components/            # High-fidelity Apple-style visual modules
│   │   ├── TopToolbar.tsx     # Minimalist tool trigger bar
│   │   ├── StageCanvas.tsx    # Live multimedia preview viewport
│   │   └── InspectorPanel.tsx # Side properties customization dock
│   ├── App.tsx                # Master orchestration node
│   └── main.tsx               # Client bootstrap & layout resets
├── package.json               # Modular dependencies and build scripts
└── README.md                  # Documentation
```

---

## ⚙️ Data Flow & Hardware Mechanics

The ecosystem operates 100% on the client's machine following a zero-trust, serverless execution pipeline:

```text
 [Hardware Input] ──> [MediaStream Track Collection] ──> [State Composition Preview]
                                                                  │
 [Local MP4 Download] <── [Virtual File System Remuxing] <── [FFmpeg WASM Sandbox Execution]
```

### 1. Unified Recording Pipeline (`src/core/recorder.ts`)
Orchestrates native WebRTC screen sharing streams combined dynamically with local audio input channels, enforcing safe thread cleanups to ensure hardware cameras and recording indicators terminate immediately upon cessation commands.

### 2. Isolated Transcoding Core (`src/core/ffmpeg-worker.ts`)
Intercepts raw browser `.webm` container data fragments and writes them directly onto a virtual in-memory file system hosted inside the browser, firing atomic binary operations to produce universally compatible `.mp4` file distributions locally.

---

## 🚀 Development & Local Initialization

Follow these straightforward deployment instructions to run the studio container system on your machine.

### Prerequisites
Ensure you have **Node.js (v20+ or latest LTS)** installed on your machine.

### Local Initialization

1. **Clone this repository into your local machine framework:**
   ```bash
   git clone https://github.com
   cd studio-pulse
   ```

2. **Install all workspace and library architectural elements:**
   ```bash
   npm install
   ```

3. **Launch the high-performance local compilation server:**
   ```bash
   npm run dev
   ```

4. **Access the application instance:**
   - Open your browser and navigate to the local environment endpoint displayed in your terminal (typically `http://localhost:5173`).

---

## 🛠️ Troubleshooting & COOP/COEP Headers

Because FFmpeg.wasm utilizes SharedArrayBuffer under the hood, modern browsers require strict security isolation protocols. If the WebAssembly runtime fails to load locally, ensure your server environment serves the following HTTP response headers:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

*Note: Vite handles this automatically inside local execution layers. If deploying to GitHub Pages or Netlify, configure your hosting provider framework or service workers to output these specific rules.*

---

## 🤝 Contributing to the Studio Ecosystem

We welcome global core contributions from developers interested in creative computing and media engineering!

1. Fork the Repository on GitHub.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes using standard conventional commits (`git commit -m 'feat: add advanced chroma filtering'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a professional Pull Request inside the parent organization architecture.

---

## 📜 MIT License

Distributed under the MIT License. See `LICENSE` inside this repository structure for comprehensive open-source legal details.
