import { runDefenseTechniques } from "../data/runDefenseData";

export default function RunDefense({ isProUser }) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "16px", maxWidth: "860px" }}>
      <div>
        <h2 style={{ margin: 0 }}>Defensa Contra la Carrera</h2>
        <p style={{ color: "#aaa", margin: "4px 0 0" }}>
          Técnicas de lectura, control box-to-box, zafe de bloqueos y ajustes de contención.
        </p>
      </div>

      <div style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
        {runDefenseTechniques.map((item) => {
          const locked = item.tier === "pro" && !isProUser;

          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "14px",
                background: "#181818",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: item.tier === "pro" ? "#3b2f00" : "#123524",
                    color: item.tier === "pro" ? "#ffd43b" : "#00ff88",
                  }}
                >
                  {item.tier.toUpperCase()} · {item.category}
                </span>
              </div>

              <p style={{ color: "#ccc", marginTop: "8px" }}>
                <strong>Objetivo:</strong> {item.goal}
              </p>

              {locked ? (
                <p style={{ color: "#ffd43b", marginBottom: 0 }}>
                  Contenido Pro bloqueado. Cambia el plan arriba a PRO para ver los puntos clave de esta técnica.
                </p>
              ) : (
                <ul style={{ margin: "8px 0 0", paddingLeft: "20px", color: "#ddd" }}>
                  {item.keys.map((keyPoint, idx) => (
                    <li key={idx} style={{ marginBottom: "4px" }}>
                      {keyPoint}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}