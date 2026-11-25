import { useRef, useState } from "react";

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState("");
  const [speed, setSpeed] = useState(1);
  const [drawing, setDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    clearCanvas();
  };

  const changeSpeed = (rate) => {
    setSpeed(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const stepFrame = (direction) => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    const frameDuration = 1 / 30;
    const nextTime = video.currentTime + direction * frameDuration;
    video.currentTime = Math.max(0, Math.min(video.duration || nextTime, nextTime));
  };

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDraw = (e) => {
    if (!drawMode) return;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getCoords(e);
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawMode || !drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.closePath();
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "16px", maxWidth: "720px" }}>
      <h2>DL Motion Lab — Prototipo</h2>

      <input type="file" accept="video/*" onChange={handleFileChange} />

      <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button onClick={() => setDrawMode((prev) => !prev)}>
          {drawMode ? "Modo: Dibujar (clic para usar video)" : "Modo: Video (clic para dibujar)"}
        </button>
        <button onClick={() => changeSpeed(0.25)}>0.25x</button>
        <button onClick={() => changeSpeed(0.5)}>0.5x</button>
        <button onClick={() => changeSpeed(1)}>1x (Normal)</button>
        <button onClick={() => stepFrame(-1)}>-1 Frame</button>
        <button onClick={() => stepFrame(1)}>+1 Frame</button>
        <button onClick={clearCanvas}>Borrar trazos</button>
      </div>

      <p style={{ fontSize: "13px", color: "#555" }}>
        Velocidad actual: {speed}x | {drawMode ? "Puedes dibujar encima" : "Controles del video activos"}
      </p>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          background: "#111",
          marginTop: "8px",
          overflow: "hidden",
          touchAction: "none",
        }}
      >
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}

        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: drawMode ? "auto" : "none",
            cursor: drawMode ? "crosshair" : "default",
          }}
        />
      </div>
    </div>
  );
}