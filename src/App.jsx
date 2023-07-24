import React from 'react';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';

export default function App() {
  return (
    <HashRouter>
      <RouterView></RouterView>
    </HashRouter>
  );
}
