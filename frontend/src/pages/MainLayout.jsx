import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <header>
        <h1>Welcome to the Main Layout</h1>
      </header>
      <main>
        <Outlet />  // To miejsce, gdzie pojawią się podkomponenty
      </main>
    </div>
  );
}