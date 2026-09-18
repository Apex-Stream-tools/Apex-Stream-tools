import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global styling reset directly injected to preserve minimalist Apple environment boundaries
const styleElement = document.createElement('style');
styleElement.innerHTML = `
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #F5F5F7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
document.head.appendChild(styleElement);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
