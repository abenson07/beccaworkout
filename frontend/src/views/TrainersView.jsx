import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrainerTable from '../components/TrainerTable';

const fakeTrainers = [
  { name: 'Trainer A', email: 'trainer.a@example.com', clients: 12, id: 1 },
  { name: 'Trainer B', email: 'trainer.b@example.com', clients: 8, id: 2 },
];

export default function TrainersView() {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h1>Trainers</h1>
        <button className="view-edit-btn" style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>+ Add new client</button>
      </div>
      <div className="view-filters">
        <button className="view-filter-btn">Filter</button>
        <input type="text" placeholder="Search trainers..." className="view-search" />
      </div>
      <TrainerTable trainers={fakeTrainers} onRowClick={row => navigate(`/trainers/${row.id}`)} />
    </div>
  );
} 