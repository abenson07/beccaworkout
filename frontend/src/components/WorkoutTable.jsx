import React, { useState } from 'react';

const baseColumns = [
  { key: 'name', label: 'Workout Name' },
  { key: 'movements', label: 'Movements' },
  { key: 'createdBy', label: 'Trainer' },
  { key: 'updated', label: 'Last updated' },
];

export default function WorkoutTable({ workouts, onRowClick, showTrainer = true }) {
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const columns = showTrainer ? baseColumns : baseColumns.filter(c => c.key !== 'createdBy');

  const sortedData = [...workouts].sort((a, b) => {
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
          <tr key={i} onClick={() => onRowClick && onRowClick(row)} style={{ cursor: onRowClick ? 'pointer' : undefined }}>
            <td>{row.name}</td>
            <td>{row.movements}</td>
            {showTrainer && <td>{row.createdBy}</td>}
            <td>{row.updated}</td>
            <td><button className="view-edit-btn">{onRowClick ? 'View →' : 'Edit →'}</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 