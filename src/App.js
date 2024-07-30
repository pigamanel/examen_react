import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import EditContact from './components/EditContact';
import ContactDetails from './components/ContactDetails';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/list" element={<ContactList />} />
        <Route path="/add" element={<ContactForm />} />
        <Route path="/edit/:id" element={<EditContact />} />
        <Route path="/details/:id" element={<ContactDetails />} />
      </Routes>
    </div>
  );
}

export default App;
