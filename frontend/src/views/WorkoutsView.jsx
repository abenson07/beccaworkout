import React from 'react';
import WorkoutTable from '../components/WorkoutTable';

const fakeTrainerGroups = [
  {
    trainerName: 'Trainer A',
    workouts: [
      { name: 'Upper Body Blast', movements: 3, createdBy: 'Trainer A', updated: '4/12/2021', id: 1 },
      { name: 'Leg Day', movements: 2, createdBy: 'Trainer A', updated: '4/12/2021', id: 2 },
    ],
  },
  {
    trainerName: 'Trainer B',
    workouts: [
      { name: 'Core Crusher', movements: 4, createdBy: 'Trainer B', updated: '4/12/2021', id: 3 },
    ],
  },
];

export default function WorkoutsView() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h1>Workouts</h1>
        <button className="view-edit-btn" style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>+ Add new client</button>
      </div>
      <div className="view-filters">
        <button className="view-filter-btn">Filter</button>
        <input type="text" placeholder="Search workouts..." className="view-search" />
      </div>
      {fakeTrainerGroups.map((group, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>{group.trainerName}</div>
          {group.workouts.map((workout, j) => (
            <div key={j} style={{ background: '#f5f6fa', borderRadius: 8, marginBottom: 12, padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{workout.name} <span style={{ color: '#888', fontWeight: 400 }}>{workout.movements} movements</span></div>
                <button className="view-edit-btn" style={{ background: '#8bc34a', color: '#222', borderRadius: 6, padding: '6px 14px', fontWeight: 600 }}>+ Edit workout</button>
              </div>
              <WorkoutTable workouts={[workout]} showTrainer={false} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 