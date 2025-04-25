import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <header>
        <h1>Main Layout</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}