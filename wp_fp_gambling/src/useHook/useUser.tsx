"use client";
import React, { useState, useEffect, createContext } from 'react';
import { useUser } from '@clerk/nextjs';

export type UserTable = {
    id: string;
    dollar: number;
};

export type UserContext = {
    userId: string | null;
    setUserId: (userId: string | null) => void;
    dollar: number | null;
    setDollar: (dollar: number | null) => void;
    fetchDollar: (userId: string) => Promise<number | undefined>;
};

export const UserContext = createContext<UserContext>({
    userId: null,
    setUserId: () => {},
    dollar: null,
    setDollar: () => {},
    fetchDollar: () => Promise.resolve(undefined),
});

type UserProviderProps = {
    children: React.ReactNode;
};

export function UserProvider({ children } : UserProviderProps) {
    const [userId, setUserId] = useState<string | null>(null);
    const [dollar, setDollar] = useState<number | null>(null);

    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            return;
        }
        setUserId(user.id);
        fetchDollar(user.id);
    }, [user]);

    const fetchDollar = async (userId: string) => {
        if (!userId) {
          return;
        }
        try {
          console.log('Fetching dollar:', userId);
          const res = await fetch(`/api/user/?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              },
              });
          const data = await res.json();
          console.log('Dollar:', data.data[0].dollar);
          setDollar(data.data[0].dollar);
          return data.data[0].dollar;
        } catch (error) {
          console.error('Error fetching dollar:', error);
          return;
        }
      };

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,
                dollar,
                setDollar,
                fetchDollar,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}