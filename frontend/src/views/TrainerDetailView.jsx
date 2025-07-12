import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClientTable from '../components/ClientTable';
import WorkoutTable from '../components/WorkoutTable';

const fakeClients = [
  { name: 'Jerome Bell', email: 'jackson.graham@example.com', trainer: 'Trainer name', clientSince: '4/12/2021', id: 1 },
  { name: 'Cameron Williamson', email: 'deanna.curtis@example.com', trainer: 'Trainer name', clientSince: '4/12/2021', id: 2 },
];
const fakeWorkouts = [
  { name: 'Workout A', movements: 3, createdBy: 'Trainer name', updated: '4/12/2021', id: 1 },
  { name: 'Workout B', movements: 2, createdBy: 'Trainer name', updated: '4/12/2021', id: 2 },
];
const tabs = ['Clients', 'Workouts', 'Programs'];

export default function TrainerDetailView() {
  const { trainerId } = useParams();
  const [tab, setTab] = useState('Clients');
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h1>Trainer Name</h1>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
        {tabs.map(t => (
          <button key={t} className="view-filter-btn" style={{ fontWeight: tab === t ? 700 : 500, background: tab === t ? '#1976d2' : '#e5e7eb', color: tab === t ? '#fff' : '#222' }} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {tab === 'Clients' && <ClientTable clients={fakeClients} onRowClick={row => navigate(`/trainers/${trainerId}/clients/${row.id}`)} />}
      {tab === 'Workouts' && <WorkoutTable workouts={fakeWorkouts} onRowClick={row => navigate(`/trainers/${trainerId}/workouts`)} showTrainer={false} />}
      {tab === 'Programs' && <div>Programs content (placeholder)</div>}
    </div>
  );
} 