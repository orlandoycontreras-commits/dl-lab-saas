import { passRushMoves } from "../data/passRushData";

export default function PassRush({ isProUser }) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "16px", maxWidth: "860px" }}>
      <div>
        <h2 style={{ margin: 0 }}>Pass Rush y Combinados</h2>
        <p style={{ color: "#aaa", margin: "4px 0 0" }}>
          Movimientos individuales y combinaciones según la reacción del bloqueador.
        </p>
      </div>

      <div style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
        {passRushMoves.map((move) => {
          const locked = move.tier === "pro" && !isProUser;

          return (
            <div
              key={move.id}
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "14px",
                background: "#181818",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                <h3 style={{ margin: 0 }}>{move.name}</h3>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: move.tier === "pro" ? "#3b2f00" : "#123524",
                    color: move.tier === "pro" ? "#ffd43b" : "#00ff88",
                  }}
                >
                  {move.tier.toUpperCase()} · {move.category}
                </span>
              </div>

              <p style={{ color: "#ccc", marginTop: "8px" }}>
                <strong>Cuándo usarlo:</strong> {move.target}
              </p>

              {locked ? (
                <p style={{ color: "#ffd43b", marginBottom: 0 }}>
                  Contenido Pro bloqueado. Cambia el plan arriba a PRO para ver los puntos clave de este movimiento.
                </p>
              ) : (
                <ul style={{ margin: "8px 0 0", paddingLeft: "20px", color: "#ddd" }}>
                  {move.keys.map((keyPoint, idx) => (
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