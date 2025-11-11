'use client'
import { User } from 'lucide-react';
import { createContext, useState, ReactNode, useContext } from 'react';

type User = {
    id: string
    name: string
    email: string
    profile_pic: string
} | null;

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);

    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, setUser, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if(!context) throw new Error('useUser must be used within a UserProvider');
    return context;
}