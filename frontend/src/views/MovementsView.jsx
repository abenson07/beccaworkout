import React from 'react';

const filters = ['Push', 'Pull', 'Machine', 'Free weights', 'Bodyweight'];
const fakeMovements = [
  { name: 'Bench Press', pushPull: 'Push', type: 'Freeweight', machine: '', workouts: 42, addedBy: 'Trainer name', updated: '4/12/2021' },
  { name: 'Lat Pulldown', pushPull: 'Pull', type: 'Machine', machine: 'Lat Pulldown', workouts: 42, addedBy: 'Trainer name', updated: '4/12/2021' },
];

export default function MovementsView() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h1>Movement</h1>
        <button className="view-edit-btn" style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>+ Edit movement</button>
      </div>
      <div className="view-filters">
        {filters.map(f => (
          <button key={f} className="view-filter-btn">{f}</button>
        ))}
        <input type="text" placeholder="Search movements..." className="view-search" />
      </div>
      <table className="view-table">
        <thead>
          <tr>
            <th>Movement name</th>
            <th>Push/Pull</th>
            <th>Type</th>
            <th>Machine Name</th>
            <th>Workouts</th>
            <th>Added by</th>
            <th>Last updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fakeMovements.map((row, i) => (
            <tr key={i}>
              <td>{row.name}</td>
              <td>{row.pushPull}</td>
              <td>{row.type}</td>
              <td>{row.machine}</td>
              <td>{row.workouts}</td>
              <td>{row.addedBy}</td>
              <td>{row.updated}</td>
              <td><button className="view-edit-btn">Edit →</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 