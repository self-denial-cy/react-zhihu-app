import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import RouterView from './router';

export default function App() {
  return (
    <HashRouter>
      <AliveScope>
        <RouterView></RouterView>
      </AliveScope>
    </HashRouter>
  );
}
