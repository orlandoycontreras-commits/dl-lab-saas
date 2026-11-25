export default function Navbar({ activeTab, setActiveTab, isProUser, setIsProUser }) {
  const tabs = [
    { id: "film", label: "Analizador" },
    { id: "drills", label: "Drills y Técnica" },
    { id: "passrush", label: "Pass Rush" },
    { id: "rundefense", label: "Contra Carrera" },
    { id: "fronts", label: "Frentes y Gaps" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
        padding: "12px 16px",
        borderBottom: "1px solid #333",
        background: "#181818",
      }}
    >
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                fontWeight: isActive ? "bold" : "normal",
                background: isActive ? "#00ff88" : "#2a2a2a",
                color: isActive ? "#111" : "#fff",
                border: "none",
                borderRadius: "6px",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setIsProUser((prev) => !prev)}
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "1px solid #555",
          background: isProUser ? "#00ff88" : "#222",
          color: isProUser ? "#111" : "#fff",
          fontWeight: "bold",
        }}
      >
        {isProUser ? "Plan: PRO" : "Plan: FREE"}
      </button>
    </nav>
  );
}