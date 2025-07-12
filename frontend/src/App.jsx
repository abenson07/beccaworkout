import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Breadcrumbs from './components/Breadcrumbs';
import ClientsView from './views/ClientsView';
import ClientDetailView from './views/ClientDetailView';
import TrainersView from './views/TrainersView';
import TrainerDetailView from './views/TrainerDetailView';
import TrainerClientDetailView from './views/TrainerClientDetailView';
import TrainerWorkoutsView from './views/TrainerWorkoutsView';
import WorkoutsView from './views/WorkoutsView';
import MovementsView from './views/MovementsView';
import EditWorkoutView from './views/EditWorkoutView';
import './App.css';

export default function App() {
  // Sidebar state is now handled by router location
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-view">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Navigate to="/clients" replace />} />
          <Route path="/clients" element={<ClientsView />} />
          <Route path="/clients/:clientId" element={<ClientDetailView />} />
          <Route path="/trainers" element={<TrainersView />} />
          <Route path="/trainers/:trainerId" element={<TrainerDetailView />} />
          <Route path="/trainers/:trainerId/clients/:clientId" element={<TrainerClientDetailView />} />
          <Route path="/trainers/:trainerId/workouts" element={<TrainerWorkoutsView />} />
          <Route path="/workouts" element={<WorkoutsView />} />
          <Route path="/workouts/:workoutId/edit" element={<EditWorkoutView />} />
          <Route path="/workouts/new" element={<EditWorkoutView />} />
          <Route path="/movements" element={<MovementsView />} />
        </Routes>
      </main>
    </div>
  );
} 