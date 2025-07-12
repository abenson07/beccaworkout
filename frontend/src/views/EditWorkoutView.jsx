import React from 'react';

const fakeMovements = [
  { name: 'Bicep Curls', type: 'Pull · Dumbell', muscle: 'Biceps', id: 1 },
  { name: 'Tricep Extensions', type: 'Push · Cable', muscle: 'Triceps', id: 2 },
];

export default function EditWorkoutView() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h1>Create workout</h1>
        <button className="view-edit-btn" style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>+ Save workout</button>
      </div>
      <div style={{ display: 'flex', gap: 32 }}>
        {/* Left: Movement search/list */}
        <div style={{ flex: 1 }}>
          <input type="text" placeholder="Search movements..." className="view-search" style={{ width: '100%', marginBottom: 12 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {fakeMovements.map(m => (
              <div key={m.id} style={{ background: '#f5f6fa', borderRadius: 8, padding: 12, cursor: 'grab' }}>
                <div style={{ fontWeight: 600 }}>{m.name}</div>
                <div style={{ color: '#888', fontSize: '0.95rem' }}>{m.type} · {m.muscle}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Drag-and-drop area */}
        <div style={{ flex: 2, background: '#f5f6fa', borderRadius: 8, padding: 18, minHeight: 400 }}>
          <div style={{ marginBottom: 18 }}>
            <input type="text" placeholder="Workout Name" className="view-search" style={{ width: 220, marginRight: 12 }} />
            <input type="text" placeholder="Type" className="view-search" style={{ width: 120 }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <span style={{ fontWeight: 600 }}>Repeat:</span> <button className="view-filter-btn">Weekly</button> Every
            <button className="view-filter-btn">S</button>
            <button className="view-filter-btn">M</button>
            <button className="view-filter-btn">T</button>
            <button className="view-filter-btn">W</button>
            <button className="view-filter-btn">T</button>
            <button className="view-filter-btn">F</button>
            <button className="view-filter-btn">S</button>
          </div>
          <div style={{ marginBottom: 18, fontWeight: 600 }}>Selected Movements (drag to reorder):</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Placeholder for selected movement cards */}
            <div style={{ background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #e0e0e0' }}>
              <div style={{ fontWeight: 600 }}>Bicep Curls</div>
              <div style={{ color: '#888', fontSize: '0.95rem' }}>Pull · Dumbell · Biceps</div>
              <div style={{ marginTop: 8 }}>
                Weight <input type="number" style={{ width: 60, marginRight: 8 }} /> lbs
                Sets <input type="number" style={{ width: 40, marginRight: 8, marginLeft: 8 }} />
                Reps <input type="number" style={{ width: 40, marginLeft: 8 }} />
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #e0e0e0' }}>
              <div style={{ fontWeight: 600 }}>Tricep Extensions</div>
              <div style={{ color: '#888', fontSize: '0.95rem' }}>Push · Cable · Triceps</div>
              <div style={{ marginTop: 8 }}>
                Weight <input type="number" style={{ width: 60, marginRight: 8 }} /> lbs
                Sets <input type="number" style={{ width: 40, marginRight: 8, marginLeft: 8 }} />
                Reps <input type="number" style={{ width: 40, marginLeft: 8 }} />
              </div>
            </div>
            {/* Add movement button */}
            <button className="view-filter-btn" style={{ marginTop: 12, width: 180 }}>+ Add movement</button>
          </div>
        </div>
      </div>
    </div>
  );
} 