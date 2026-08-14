import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './app/providers.jsx';
import { App } from './App.jsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Providers>
      <App />
    </Providers>
  );
}
