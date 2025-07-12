import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClientTable from '../components/ClientTable';

const fakeClients = [
  { name: 'Jerome Bell', email: 'jackson.graham@example.com', trainer: 'Trainer name', clientSince: '4/12/2021', id: 1 },
  { name: 'Cameron Williamson', email: 'deanna.curtis@example.com', trainer: 'Trainer name', clientSince: '4/12/2021', id: 2 },
];

export default function ClientsView() {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h1>Clients</h1>
        <button className="view-edit-btn" style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>+ Add new client</button>
      </div>
      <div className="view-filters">
        <button className="view-filter-btn">Filter</button>
        <input type="text" placeholder="Search clients..." className="view-search" />
      </div>
      <ClientTable clients={fakeClients} onRowClick={row => navigate(`/clients/${row.id}`)} />
    </div>
  );
} 