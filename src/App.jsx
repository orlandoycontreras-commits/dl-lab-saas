import { useState } from "react";
import Navbar from "./components/Navbar";
import FilmRoom from "./pages/FilmRoom";
import DrillsLibrary from "./pages/DrillsLibrary";
import PassRush from "./pages/PassRush";
import RunDefense from "./pages/RunDefense";
import FrontsAndGaps from "./pages/FrontsAndGaps";

export default function App() {
  const [activeTab, setActiveTab] = useState("film");
  const [isProUser, setIsProUser] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff" }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isProUser={isProUser}
        setIsProUser={setIsProUser}
      />

      {activeTab === "film" && <FilmRoom isProUser={isProUser} />}
      {activeTab === "drills" && <DrillsLibrary isProUser={isProUser} />}
      {activeTab === "passrush" && <PassRush isProUser={isProUser} />}
      {activeTab === "rundefense" && <RunDefense isProUser={isProUser} />}
      {activeTab === "fronts" && <FrontsAndGaps isProUser={isProUser} />}
    </div>
  );
}