import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const MOCK_WORKOUTS = [
  {
    id: 1,
    name: "Workout Name",
    movements: [
      {
        id: 1,
        name: "Movement Name",
        type: "Freeweight/Dumbell/Machine Name",
        sets: 3,
        reps: 12,
        notes: "Add special notes"
      },
      {
        id: 2,
        name: "Movement Name",
        type: "Freeweight/Dumbell/Machine Name",
        sets: 3,
        reps: 12,
        notes: "Special notes are right here. We add them in a modal and on the client profile tied to a specific movement."
      }
    ]
  },
  {
    id: 2,
    name: "Workout Name",
    movements: []
  },
  {
    id: 3,
    name: "Workout Name",
    movements: []
  }
];

export default function WorkoutBuilder() {
  const [workouts, setWorkouts] = useState(MOCK_WORKOUTS);
  const [showNewWorkout, setShowNewWorkout] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");

  function handleNewWorkout() {
    if (!newWorkoutName.trim()) return;
    setWorkouts([
      ...workouts,
      { id: Date.now(), name: newWorkoutName, movements: [] }
    ]);
    setNewWorkoutName("");
    setShowNewWorkout(false);
  }

  function moveMovement(workoutIdx, movementIdx, direction) {
    setWorkouts(prev => {
      // Deep clone workouts and movements
      const newWorkouts = prev.map(w => ({ ...w, movements: [...w.movements] }));
      const movements = newWorkouts[workoutIdx].movements;
      console.log('moveMovement called', { workoutIdx, movementIdx, direction });
      if (direction === 'up' && movementIdx > 0) {
        [movements[movementIdx - 1], movements[movementIdx]] = [movements[movementIdx], movements[movementIdx - 1]];
      } else if (direction === 'down' && movementIdx < movements.length - 1) {
        [movements[movementIdx + 1], movements[movementIdx]] = [movements[movementIdx], movements[movementIdx + 1]];
      }
      newWorkouts[workoutIdx].movements = [...movements]; // force new reference
      return [...newWorkouts];
    });
  }

  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "40px 32px 0 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>Workouts</h1>
        <button onClick={() => setShowNewWorkout(true)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 4, padding: "12px 28px", fontWeight: 600, fontSize: 18, cursor: "pointer" }}>Add workout</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {workouts.map((w, wIdx) => (
          <div key={w.id} style={{ border: "2px solid #bbb", borderRadius: 10, padding: 32, background: "#fff", minWidth: 400, marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 28 }}>{w.name}</div>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <button style={{ background: "none", border: "none", color: "#222", fontWeight: 500, fontSize: 17, cursor: "pointer" }}>Assign</button>
                <button style={{ background: "none", border: "none", color: "#222", fontWeight: 500, fontSize: 17, cursor: "pointer" }}>Duplicate</button>
                <button style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer" }}>▸</button>
              </div>
            </div>
            {w.movements.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 16 }}>
                {w.movements.map((m, i) => (
                  <div key={m.id} style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, width: 32 }}>
                      <button
                        onClick={() => moveMovement(wIdx, i, 'up')}
                        disabled={i === 0}
                        style={{ background: 'none', border: 'none', color: i === 0 ? '#bbb' : '#222', fontSize: 18, cursor: i === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveMovement(wIdx, i, 'down')}
                        disabled={i === w.movements.length - 1}
                        style={{ background: 'none', border: 'none', color: i === w.movements.length - 1 ? '#bbb' : '#222', fontSize: 18, cursor: i === w.movements.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                        title="Move down"
                      >
                        ▼
                      </button>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 18 }}>{m.name}</div>
                      <div style={{ color: '#444', fontSize: 15, marginBottom: 8 }}>{m.type}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, fontSize: 16 }}>Sets <input type="number" value={m.sets} style={{ width: 48, marginLeft: 4, fontSize: 16, padding: 4, border: '1.5px solid #bbb', borderRadius: 4 }} readOnly /></label>
                        <label style={{ fontWeight: 500, fontSize: 16 }}>Reps <input type="number" value={m.reps} style={{ width: 48, marginLeft: 4, fontSize: 16, padding: 4, border: '1.5px solid #bbb', borderRadius: 4 }} readOnly /></label>
                        <input type="text" value={m.notes} style={{ flex: 1, fontSize: 16, padding: 8, border: '1.5px solid #bbb', borderRadius: 4 }} readOnly placeholder="Add special notes" />
                      </div>
                      <div style={{ color: '#444', fontSize: 15, marginBottom: 8 }}>
                        Add rest | Add movement
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end', minWidth: 90 }}>
                      <button style={{ background: 'none', border: 'none', color: '#e11d48', fontWeight: 500, fontSize: 16, cursor: 'pointer', marginBottom: 8 }}>Delete</button>
                      <button style={{ background: 'none', border: 'none', color: '#222', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Duplicate</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ color: '#444', fontSize: 15, marginBottom: 8, marginTop: 8 }}>
              Delete workout
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
} 