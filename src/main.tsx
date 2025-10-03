import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './themes/ThemeProvider';
// Make sure CSS is imported before the app renders
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
