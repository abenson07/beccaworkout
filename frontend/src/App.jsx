import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ClientsView from './components/ClientsView';
import TrainersView from './components/TrainersView';
import WorkoutsView from './components/WorkoutsView';
import MovementsView from './components/MovementsView';
import './App.css';

const viewComponents = {
  clients: ClientsView,
  trainers: TrainersView,
  workouts: WorkoutsView,
  movements: MovementsView,
};

export default function App() {
  const [activeView, setActiveView] = useState('workouts');
  const ViewComponent = viewComponents[activeView];

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />
      <main className="main-view">
        <ViewComponent />
      </main>
    </div>
  );
} 