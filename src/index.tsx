import React from 'react';
import ReactDOM from 'react-dom/client';
import ReferenceForm from './components/ReferenceForm'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReferenceForm />
  </React.StrictMode>
);

