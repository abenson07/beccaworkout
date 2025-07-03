import React, { useState } from "react";
import WorkoutBuilder from "./components/WorkoutBuilder.jsx";
import AdminMovements from "./components/AdminMovements.jsx";

const NAV_ITEMS = ["Clients", "Workouts", "Movements", "Programs"];

function TopNav({ current, onNav }) {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      height: 64,
      borderBottom: "1px solid #e5e7eb",
      background: "#fff"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <div style={{ width: 32, height: 32, background: "#e5e7eb", borderRadius: 6, marginRight: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>Logo</div>
        {NAV_ITEMS.map(item => (
          <button
            key={item}
            style={{
              background: current === item ? "#e5e7eb" : "none",
              border: current === item ? "1.5px solid #888" : "none",
              borderRadius: 6,
              padding: "8px 18px",
              fontWeight: 600,
              color: current === item ? "#222" : "#222",
              marginRight: 8,
              fontSize: 17,
              cursor: "pointer"
            }}
            onClick={() => onNav(item)}
            aria-current={current === item ? "page" : undefined}
          >
            {item}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontWeight: 500, fontSize: 17 }}>Trainer Name</span>
        <span style={{ width: 32, height: 32, background: "#e5e7eb", borderRadius: "50%", display: 'inline-block' }} />
        <span style={{ fontSize: 20, marginLeft: 8, cursor: 'pointer' }} title="Profile">&#128100;</span>
        <span style={{ fontSize: 20, marginLeft: 8, cursor: 'pointer' }} title="Logout">&#128682;</span>
      </div>
    </header>
  );
}

function App() {
  const [view, setView] = useState("Workouts");

  function handleNav(item) {
    setView(item);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw", background: "#fafbfc" }}>
      <TopNav current={view} onNav={handleNav} />
      <main style={{ flex: 1, width: '100%', maxWidth: '100vw', margin: 0, padding: 0 }}>
        {view === "Workouts" && <WorkoutBuilder />}
        {view === "Movements" && <AdminMovements />}
        {/* Add placeholder for Clients and Programs if needed */}
      </main>
    </div>
  );
}

export default App; 