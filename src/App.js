import './App.css';
import Dashboard from './Page/Dashboard/Dashboard';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
     <Dashboard />
   </React.StrictMode>
);
}

export default App;

