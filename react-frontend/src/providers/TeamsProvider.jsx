import { createContext, useEffect, useState } from 'react';

import { makeFetch } from '../utils/makeFetch';

export const TeamsContext = createContext(null);

export default function TeamsProvider({ children }) {

    const [ownedTeams, setOwnedTeams] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {

        const getOwnedTeams = async () => {
            const response = await makeFetch('http://localhost:3000/teams/selectUserTeams');

            if (!response) return;

            setOwnedTeams(response);
        }

        getOwnedTeams();

    }, []);

    useEffect(() => {

        const getTeams = async () => {
            const response = await makeFetch('http://localhost:3000/teams/selectJoinedUserTeams');

            if (!response) return;

            setTeams(response);
        }

    }, []);
    
    return <TeamsContext.Provider value={{ ownedTeams, setOwnedTeams }}>
        { children }
    </TeamsContext.Provider>
}