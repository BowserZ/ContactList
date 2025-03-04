import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ContactList from './Contact';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactList />
  </StrictMode>
);
