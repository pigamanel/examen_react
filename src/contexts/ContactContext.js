// src/contexts/ContactContext.js
import React, { createContext, useState } from 'react';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);

    const addContact = (contact) => {
        setContacts([...contacts, contact]);
    };

    const updateContact = (id, updatedContact) => {
        setContacts(
            contacts.map(contact => (contact.id === id ? { ...updatedContact, id } : contact))
        );
    };

    const deleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    return (
        <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
            {children}
        </ContactContext.Provider>
    );
};
