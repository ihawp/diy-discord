import { useEffect, useState, createContext } from 'react';

import { makeFetch } from '../utils/makeFetch';

export const AccountContext = createContext(null);

export default function AccountProvider({ children }) {

    const [verified, setVerified] = useState(false);
    const [account, setAccount] = useState({
        account_created: "",
        email: "",
        email_verified: 0,
        pfp_url: "default-user.webp",
        username: "",
    });

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
            console.log(response.user);
            setAccount(response.user);
            
        }

        doFetch();

    }, []);

    return <AccountContext.Provider value={{ verified, setVerified, account, setAccount }}>
        { children }
    </AccountContext.Provider>

}