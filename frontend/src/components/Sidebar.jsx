import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { key: 'clients', label: 'Clients', path: '/clients' },
  { key: 'trainers', label: 'Trainers', path: '/trainers' },
  { key: 'workouts', label: 'Workouts', path: '/workouts' },
  { key: 'movements', label: 'Movements', path: '/movements' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Logo</div>
      <nav className="sidebar-nav">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.key}
              to={item.path}
              className={`sidebar-nav-item${isActive ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-profile">Profile</button>
        <button className="sidebar-logout">Logout</button>
      </div>
    </div>
  );
} 