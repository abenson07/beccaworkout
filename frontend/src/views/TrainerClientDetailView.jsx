import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkoutTable from '../components/WorkoutTable';

const fakeWorkouts = [
  { name: 'Workout X', movements: 2, createdBy: 'Trainer name', updated: '4/12/2021', id: 1 },
  { name: 'Workout Y', movements: 1, createdBy: 'Trainer name', updated: '4/12/2021', id: 2 },
];

const tabs = ['Workouts', 'Accommodations', 'Notes'];

export default function TrainerClientDetailView() {
  const { trainerId, clientId } = useParams();
  const [tab, setTab] = useState('Workouts');
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1>Client Name</h1>
          <div style={{ color: '#888', fontSize: '1rem' }}>client.email@example.com</div>
        </div>
        <button className="view-edit-btn" style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>+ Edit workout</button>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
        {tabs.map(t => (
          <button key={t} className="view-filter-btn" style={{ fontWeight: tab === t ? 700 : 500, background: tab === t ? '#1976d2' : '#e5e7eb', color: tab === t ? '#fff' : '#222' }} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {tab === 'Workouts' && (
        <div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Trainer name <span style={{ color: '#888', fontWeight: 400 }}>2 movements</span></div>
            <WorkoutTable workouts={fakeWorkouts} showTrainer={false} />
          </div>
        </div>
      )}
      {tab === 'Accommodations' && <div>Accommodations content (placeholder)</div>}
      {tab === 'Notes' && <div>Notes content (placeholder)</div>}
    </div>
  );
} 