import React, { useState } from 'react';
import './ViewStyles.css';

const initialData = [
  { name: 'Upper Body Blast', movements: 5, createdBy: 'Trainer A', updated: '4/12/2021' },
  { name: 'Leg Day', movements: 4, createdBy: 'Trainer B', updated: '4/12/2021' },
];

const columns = [
  { key: 'name', label: 'Workout Name' },
  { key: 'movements', label: 'Movements' },
  { key: 'createdBy', label: 'Created by' },
  { key: 'updated', label: 'Last updated' },
];

export default function WorkoutsView() {
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
      <h1>Workouts</h1>
      <div className="view-filters">
        <input type="text" placeholder="Search workouts..." className="view-search" />
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
              <td>{row.movements}</td>
              <td>{row.createdBy}</td>
              <td>{row.updated}</td>
              <td><button className="view-edit-btn">Edit →</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 