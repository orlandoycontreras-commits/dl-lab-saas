import { useRef, useState } from "react";

export default function FilmRoom({ isProUser }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState("");
  const [speed, setSpeed] = useState(1);
  const [drawing, setDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState(true);
  const [strokeColor, setStrokeColor] = useState("#00ff88");
  const [lineWidth, setLineWidth] = useState(3);
  const [history, setHistory] = useState([]);

  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setHistory((prev) => [...prev.slice(-14), dataUrl]);
  };

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
    saveSnapshot();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getCoords(e);
    ctx.strokeStyle = isProUser ? strokeColor : "#00ff88";
    ctx.lineWidth = isProUser ? lineWidth : 3;
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

  const undoStroke = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const previousUrl = history[history.length - 1];
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = previousUrl;
    setHistory((prev) => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  };

  const exportAnnotatedFrame = () => {
    const video = videoRef.current;
    const drawCanvas = canvasRef.current;
    if (!drawCanvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = drawCanvas.width;
    exportCanvas.height = drawCanvas.height;
    const ctx = exportCanvas.getContext("2d");

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    if (video && videoUrl) {
      ctx.drawImage(video, 0, 0, exportCanvas.width, exportCanvas.height);
    }

    ctx.drawImage(drawCanvas, 0, 0, exportCanvas.width, exportCanvas.height);

    const link = document.createElement("a");
    link.download = "dl-motion-lab-analisis.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  const colors = [
    { label: "Verde", value: "#00ff88" },
    { label: "Amarillo", value: "#ffd43b" },
    { label: "Rojo", value: "#ff6b6b" },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", padding: "16px", maxWidth: "780px" }}>
      <h2>DL Motion Lab — Analizador de Video</h2>

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
        <button onClick={undoStroke} disabled={history.length === 0}>
          Deshacer
        </button>
        <button onClick={clearCanvas}>Borrar trazos</button>
      </div>

      <div
        style={{
          marginTop: "12px",
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #333",
          background: "#181818",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "#ccc" }}>Color (PRO):</span>
          {colors.map((c) => (
            <button
              key={c.value}
              disabled={!isProUser}
              onClick={() => setStrokeColor(c.value)}
              style={{
                padding: "4px 10px",
                cursor: isProUser ? "pointer" : "not-allowed",
                opacity: isProUser ? 1 : 0.5,
                borderRadius: "999px",
                border: strokeColor === c.value && isProUser ? "2px solid #fff" : "1px solid #555",
                background: c.value,
                color: "#111",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {c.label}
            </button>
          ))}

          <span style={{ fontSize: "13px", color: "#ccc", marginLeft: "6px" }}>Grosor (PRO):</span>
          {[2, 4, 7].map((w) => (
            <button
              key={w}
              disabled={!isProUser}
              onClick={() => setLineWidth(w)}
              style={{
                padding: "4px 8px",
                cursor: isProUser ? "pointer" : "not-allowed",
                opacity: isProUser ? 1 : 0.5,
                borderRadius: "6px",
                border: lineWidth === w && isProUser ? "1px solid #00ff88" : "1px solid #555",
                background: lineWidth === w && isProUser ? "#2a2a2a" : "#111",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              {w}px
            </button>
          ))}
        </div>

        <button
          disabled={!isProUser}
          onClick={exportAnnotatedFrame}
          style={{
            padding: "6px 12px",
            cursor: isProUser ? "pointer" : "not-allowed",
            opacity: isProUser ? 1 : 0.5,
            borderRadius: "6px",
            border: "1px solid #00ff88",
            background: isProUser ? "#00ff88" : "#222",
            color: isProUser ? "#111" : "#aaa",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
          Exportar PNG (PRO)
        </button>
      </div>

      <p style={{ fontSize: "13px", color: "#aaa" }}>
        Velocidad actual: {speed}x | {drawMode ? "Puedes dibujar encima" : "Controles del video activos"}
        {!isProUser && " · Cambia a Plan: PRO arriba para elegir color/grosor y exportar captura"}
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