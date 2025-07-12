import React, { useState } from 'react';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'clients', label: 'Clients' },
];

export default function TrainerTable({ trainers, onRowClick }) {
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const sortedData = [...trainers].sort((a, b) => {
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
            <td>{row.email}</td>
            <td>{row.clients}</td>
            <td><button className="view-edit-btn">View →</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 