import React from 'react';
import { useParams } from 'react-router-dom';
import WorkoutTable from '../components/WorkoutTable';

const fakeWorkoutGroups = [
  {
    workoutName: 'Upper Body Blast',
    movementCount: 3,
    workouts: [
      { name: 'Upper Body Blast', movements: 3, createdBy: 'Trainer name', updated: '4/12/2021', id: 1 },
    ],
  },
  {
    workoutName: 'Leg Day',
    movementCount: 2,
    workouts: [
      { name: 'Leg Day', movements: 2, createdBy: 'Trainer name', updated: '4/12/2021', id: 2 },
    ],
  },
];

export default function TrainerWorkoutsView() {
  const { trainerId } = useParams();
  return (
    <div>
      <h1>Trainer Name</h1>
      {fakeWorkoutGroups.map((group, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontWeight: 600 }}>{group.workoutName} <span style={{ color: '#888', fontWeight: 400 }}>{group.movementCount} movements</span></div>
            <button className="view-edit-btn" style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>+ Assign to client</button>
          </div>
          <WorkoutTable workouts={group.workouts} showTrainer={false} />
        </div>
      ))}
    </div>
  );
} 