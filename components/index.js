import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import '../stylesheets/style.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
