import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const movementFields = [
  "id",
  "type",
  "machine_name",
  "movement_name",
  "description",
  "image_url",
  "video_url",
  "gif_url",
  "created_at"
];

export default function AdminMovements() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideoutOpen, setSlideoutOpen] = useState(false);
  // For future navigation, track selected view
  const [activeView, setActiveView] = useState("movements");

  useEffect(() => {
    async function fetchMovements() {
      setLoading(true);
      const { data, error } = await supabase.from("movements").select();
      if (!error) setMovements(data);
      setLoading(false);
    }
    fetchMovements();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f8fa" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #eee", padding: 24 }}>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <button
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  border: "none",
                  background: activeView === "movements" ? "#e0e7ff" : "none",
                  color: activeView === "movements" ? "#2563eb" : "#222",
                  borderRadius: 6,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: 4
                }}
                onClick={() => setActiveView("movements")}
                aria-current={activeView === "movements" ? "page" : undefined}
              >
                Movements
              </button>
            </li>
            {/* Future nav items here */}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, padding: 32 }}>
        {activeView === "movements" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2>Movements</h2>
              <button onClick={() => setSlideoutOpen(true)} style={{ padding: "8px 16px", borderRadius: 4, background: "#2563eb", color: "#fff", border: "none" }}>Add Movement</button>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 24 }}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {movementFields.map((field) => (
                        <th key={field} style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee", fontWeight: 600 }}>{field.replace(/_/g, " ")}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {movements.map((m) => (
                      <tr key={m.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        {movementFields.map((field) => (
                          <td key={field} style={{ padding: 8, fontSize: 14 }}>{m[field]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>
      {/* Slideout Panel */}
      {slideoutOpen && (
        <div style={{ position: "fixed", top: 0, right: 0, width: 400, height: "100vh", background: "#fff", boxShadow: "-2px 0 8px rgba(0,0,0,0.08)", zIndex: 100, padding: 32, transition: "transform 0.3s", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3>Add/Edit Movement</h3>
            <button onClick={() => setSlideoutOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>&times;</button>
          </div>
          <div style={{ flex: 1, color: "#888" }}>
            {/* Placeholder content */}
            Form coming soon...
          </div>
        </div>
      )}
    </div>
  );
} 