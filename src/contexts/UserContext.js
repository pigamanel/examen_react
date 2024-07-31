import React, { createContext, useState, useContext } from 'react';

// Crée un contexte pour l'utilisateur
const UserContext = createContext();

// Fournisseur du contexte utilisateur
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook pour utiliser le contexte utilisateur
export const useUser = () => useContext(UserContext);
