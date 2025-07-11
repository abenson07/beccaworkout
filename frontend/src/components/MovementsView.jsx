import React, { useState } from 'react';
import './ViewStyles.css';

const filters = ['Push', 'Pull', 'Machine', 'Free weights', 'Bodyweight'];

const initialData = [
  { name: 'Bench Press', pushPull: 'Push', type: 'Freeweight', machine: '', workouts: 42, addedBy: 'Trainer name', updated: '4/12/2021' },
  { name: 'Lat Pulldown', pushPull: 'Pull', type: 'Machine', machine: 'Lat Pulldown', workouts: 42, addedBy: 'Trainer name', updated: '4/12/2021' },
];

const columns = [
  { key: 'name', label: 'Movement name' },
  { key: 'pushPull', label: 'Push/Pull' },
  { key: 'type', label: 'Type' },
  { key: 'machine', label: 'Machine Name' },
  { key: 'workouts', label: 'Workouts' },
  { key: 'addedBy', label: 'Added by' },
  { key: 'updated', label: 'Last updated' },
];

export default function MovementsView() {
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const sortedData = [...initialData].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDir === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  function handleSort(col) {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
  }

  return (
    <div className="view-container">
      <h1>Movement</h1>
      <div className="view-filters">
        {filters.map(f => (
          <button key={f} className="view-filter-btn">{f}</button>
        ))}
        <input type="text" placeholder="Search movements..." className="view-search" />
      </div>
      <table className="view-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{ cursor: 'pointer' }}
              >
                {col.label} {sortBy === col.key ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
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