import { useState } from "react";
import Navbar from "./components/Navbar";
import FilmRoom from "./pages/FilmRoom";
import DrillsLibrary from "./pages/DrillsLibrary";
import PassRush from "./pages/PassRush";
import RunDefense from "./pages/RunDefense";
import FrontsAndGaps from "./pages/FrontsAndGaps";

export default function App() {
  const [activeTab, setActiveTab] = useState("film");

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "film" && <FilmRoom />}
      {activeTab === "drills" && <DrillsLibrary />}
      {activeTab === "passrush" && <PassRush />}
      {activeTab === "rundefense" && <RunDefense />}
      {activeTab === "fronts" && <FrontsAndGaps />}
    </div>
  );
}