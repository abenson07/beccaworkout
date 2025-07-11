import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const SIDEBAR_ITEMS = ["Workouts", "Clients", "Movements"];

const MOCK_WORKOUTS = [
  {
    id: 1,
    name: "Workout 1",
    movements: ["Squat", "Bench Press", "Deadlift"]
  },
  {
    id: 2,
    name: "Workout 2",
    movements: ["Pull Up", "Push Up"]
  }
];

export default function WorkoutBuilder({ onSidebarNav }) {
  const [sidebar, setSidebar] = useState("Workouts");
  const [workouts, setWorkouts] = useState(MOCK_WORKOUTS);
  const [expanded, setExpanded] = useState([]); // array of workout ids
  const [showNewWorkout, setShowNewWorkout] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [showAddMovement, setShowAddMovement] = useState(false);
  const [addMovementWorkoutId, setAddMovementWorkoutId] = useState(null);
  const [search, setSearch] = useState("");
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    async function fetchMovements() {
      const { data, error } = await supabase.from("movements").select("movement_name");
      if (!error && data) {
        setMovements(data.map(m => m.movement_name));
      }
    }
    fetchMovements();
  }, []);

  function handleExpand(id) {
    setExpanded((prev) => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  }

  function handleNewWorkout() {
    if (!newWorkoutName.trim()) return;
    setWorkouts([...workouts, { id: Date.now(), name: newWorkoutName, movements: [] }]);
    setNewWorkoutName("");
    setShowNewWorkout(false);
  }

  function handleShowAddMovement(workoutId) {
    setAddMovementWorkoutId(workoutId);
    setShowAddMovement(true);
    setSearch("");
  }

  function handleAddMovementToWorkout(movement) {
    setWorkouts(workouts.map(w => w.id === addMovementWorkoutId ? { ...w, movements: [...w.movements, movement] } : w));
    setShowAddMovement(false);
    setAddMovementWorkoutId(null);
    setSearch("");
  }

  function handleDeleteWorkout(id) {
    setWorkouts(workouts.filter(w => w.id !== id));
  }

  // Sidebar navigation (Movements links to AdminMovements, Workouts to this page)
  function handleSidebarClick(item) {
    setSidebar(item);
    if (onSidebarNav) {
      onSidebarNav(item);
    }
  }

  // Autocomplete suggestions from Supabase
  const filteredSuggestions = movements.filter(s => s.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fafbfc" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #eee", padding: 24 }}>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {SIDEBAR_ITEMS.map(item => (
              <li key={item}>
                <button
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    border: "none",
                    background: sidebar === item ? "#e0e7ff" : "none",
                    color: sidebar === item ? "#2563eb" : "#222",
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: "pointer",
                    marginBottom: 4
                  }}
                  onClick={() => handleSidebarClick(item)}
                  aria-current={sidebar === item ? "page" : undefined}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <button onClick={() => setShowNewWorkout(true)} style={{ padding: "8px 16px", borderRadius: 4, background: "#2563eb", color: "#fff", border: "none" }}>New Workout</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {workouts.map(w => (
            <div key={w.id} style={{ border: "2px solid #bbb", borderRadius: 10, padding: 24, background: "#fff", minWidth: 400 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 20 }}>Workout <span style={{ fontWeight: 400, fontSize: 16, marginLeft: 8 }}>{w.movements.length} movements</span></div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <button style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 500, cursor: "pointer" }}>Assign</button>
                  <button style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 500, cursor: "pointer" }}>Duplicate</button>
                  <button onClick={() => handleExpand(w.id)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>{expanded.includes(w.id) ? "▾" : "▸"}</button>
                </div>
              </div>
              {expanded.includes(w.id) && (
                <div style={{ marginTop: 16 }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {w.movements.map((m, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 18 }}>≡</span> {m}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleShowAddMovement(w.id)} style={{ marginTop: 8, background: "none", border: "none", color: "#2563eb", fontWeight: 500, cursor: "pointer" }}>+ Add Movement</button>
                  <button onClick={() => handleDeleteWorkout(w.id)} style={{ float: "right", color: "#e11d48", background: "none", border: "none", fontWeight: 500, marginTop: 16, cursor: "pointer" }}>Delete workout</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      {/* New Workout Modal */}
      {showNewWorkout && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
            <h3 style={{ marginTop: 0 }}>New Workout</h3>
            <input
              value={newWorkoutName}
              onChange={e => setNewWorkoutName(e.target.value)}
              placeholder="Workout name"
              style={{ width: '100%', padding: 8, marginBottom: 16, borderRadius: 4, border: '1px solid #ddd' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setShowNewWorkout(false)} style={{ background: '#f3f4f6', color: '#222', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleNewWorkout} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Create</button>
            </div>
          </div>
        </div>
      )}
      {/* Add Movement Modal */}
      {showAddMovement && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
            <h3 style={{ marginTop: 0 }}>Add Movement</h3>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search movements..."
              style={{ width: '100%', padding: 8, marginBottom: 16, borderRadius: 4, border: '1px solid #ddd' }}
            />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 120, overflowY: 'auto' }}>
              {filteredSuggestions.map((s, i) => (
                <li key={i}>
                  <button onClick={() => handleAddMovementToWorkout(s)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: '#2563eb' }}>{s}</button>
                </li>
              ))}
              {filteredSuggestions.length === 0 && <li style={{ color: '#888', padding: 8 }}>No results</li>}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
              <button onClick={() => setShowAddMovement(false)} style={{ background: '#f3f4f6', color: '#222', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 