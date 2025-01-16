import React from 'react';
import Sidebar from '../component/Sidebar';

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white h-[400px] p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total User</h2>
            <p className="mt-2">Manage users and their permissions.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Posts</h2>
            <p className="mt-2">Review and manage posts.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Acara</h2>
            <p className="mt-2">Configure application settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}