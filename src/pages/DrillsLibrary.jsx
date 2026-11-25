import { dlDrillsData } from "../data/drillsData";

export default function DrillsLibrary({ isProUser }) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "16px", maxWidth: "860px" }}>
      <div>
        <h2 style={{ margin: 0 }}>Drills y Fundamentos DL</h2>
        <p style={{ color: "#aaa", margin: "4px 0 0" }}>
          Ejercicios técnicos con puntos clave de ejecución y espacio para video demostrativo.
        </p>
      </div>

      <div style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
        {dlDrillsData.map((drill) => {
          const locked = drill.tier === "pro" && !isProUser;

          return (
            <div
              key={drill.id}
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "14px",
                background: "#181818",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <h3 style={{ margin: 0 }}>{drill.name}</h3>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: drill.tier === "pro" ? "#3b2f00" : "#123524",
                    color: drill.tier === "pro" ? "#ffd43b" : "#00ff88",
                  }}
                >
                  {drill.tier.toUpperCase()} · {drill.category}
                </span>
              </div>

              <p style={{ color: "#ccc", marginTop: "8px" }}>
                <strong>Objetivo:</strong> {drill.goal}
              </p>

              {locked ? (
                <p style={{ color: "#ffd43b", marginBottom: 0 }}>
                  Contenido Pro bloqueado. Cambia el plan arriba a PRO para ver los puntos clave y el video de este drill.
                </p>
              ) : (
                <>
                  <ul style={{ margin: "8px 0 0", paddingLeft: "20px", color: "#ddd" }}>
                    {drill.keys.map((keyPoint, idx) => (
                      <li key={idx} style={{ marginBottom: "4px" }}>
                        {keyPoint}
                      </li>
                    ))}
                  </ul>

                  {drill.videoUrl ? (
                    <video
                      src={drill.videoUrl}
                      controls
                      style={{ width: "100%", marginTop: "10px", borderRadius: "6px" }}
                    />
                  ) : (
                    <p style={{ fontSize: "12px", color: "#888", marginTop: "10px", marginBottom: 0 }}>
                      Video demostrativo pendiente de cargar en <code>videoUrl</code>.
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}