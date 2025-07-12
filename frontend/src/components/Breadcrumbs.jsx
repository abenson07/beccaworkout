import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const pathMap = {
  'clients': 'Clients',
  'trainers': 'Trainers',
  'workouts': 'Workouts',
  'movements': 'Movements',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  let path = '';
  return (
    <nav className="breadcrumbs" style={{ margin: '24px 0 18px 0', fontSize: '1.1rem' }}>
      <span>
        {segments.map((seg, i) => {
          path += '/' + seg;
          let label = pathMap[seg] || (seg.match(/^\d+$/) ? 'Detail' : seg.replace(/-/g, ' '));
          // For demo, show placeholder names for ids
          if (seg.match(/^\d+$/)) {
            if (segments[i - 1] === 'clients') label = 'Client Name';
            if (segments[i - 1] === 'trainers') label = 'Trainer Name';
          }
          return (
            <span key={i}>
              {i > 0 && <span style={{ color: '#888', margin: '0 8px' }}>{'>'}</span>}
              {i < segments.length - 1 ? (
                <Link to={path} style={{ color: '#1976d2', textDecoration: 'none' }}>{label}</Link>
              ) : (
                <span style={{ color: '#222', fontWeight: 600 }}>{label}</span>
              )}
            </span>
          );
        })}
      </span>
    </nav>
  );
} 