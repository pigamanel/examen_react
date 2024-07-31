// src/context/UserContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Définir le type pour l'utilisateur
interface User {
    id: string;
    name: string;
    email: string;
}

// Définir le type pour le contexte utilisateur
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Créer un contexte avec un type initial vide
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte utilisateur
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
