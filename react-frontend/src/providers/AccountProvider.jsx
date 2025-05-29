import { useEffect, useState, createContext } from 'react';

import { makeFetch } from '../utils/makeFetch';

export const AccountContext = createContext(null);

export default function AccountProvider({ children }) {

    const [verified, setVerified] = useState(false);
    const [account, setAccount] = useState(false);

    const handleLogout = async () => {

        const response = await fetch('', {
            method: 'GET',
            credentials: 'include',
        });

    }

    useEffect(() => {

        const doFetch = async () => {

            const response = await makeFetch('http://localhost:3000/auth/verify');

            // Once login is working test this for successful response, error certainly gives false
            if (!response) return;

            setVerified(response.verified);
            setAccount(response.user);
            
        }

        doFetch();

    }, []);

    return <AccountContext.Provider value={{ verified, account }}>
        { children }
    </AccountContext.Provider>

}