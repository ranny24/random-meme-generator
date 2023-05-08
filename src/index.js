import './styles.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// eslint-disable-next-line no-restricted-syntax
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
