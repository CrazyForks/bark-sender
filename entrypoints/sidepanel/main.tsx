import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../popup/App';
import '../popup/App.css';

const url = new URL(window.location.href);
if (!url.searchParams.has('mode')) {
  url.searchParams.set('mode', 'sidepanel');
  window.history.replaceState({}, '', url.toString());
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
