export default function Navbar({ activeTab, setActiveTab }) {
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
        gap: "8px",
        flexWrap: "wrap",
        padding: "12px 16px",
        borderBottom: "1px solid #333",
        background: "#181818",
      }}
    >
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
    </nav>
  );
}