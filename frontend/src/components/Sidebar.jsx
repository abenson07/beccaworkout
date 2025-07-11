import React from 'react';
import './Sidebar.css';

const navItems = [
  { key: 'clients', label: 'Clients' },
  { key: 'trainers', label: 'Trainers' },
  { key: 'workouts', label: 'Workouts' },
  { key: 'movements', label: 'Movements' },
];

export default function Sidebar({ activeView, onChangeView }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Logo</div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`sidebar-nav-item${activeView === item.key ? ' active' : ''}`}
            onClick={() => onChangeView(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-profile">Profile</button>
        <button className="sidebar-logout">Logout</button>
      </div>
    </div>
  );
} 