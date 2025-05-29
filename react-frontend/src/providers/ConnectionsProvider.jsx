import { createContext, useState, useEffect } from 'react';
import { makeFetchPost } from '../utils/makeFetch';

const ConnectionsContext = createContext(null);

export default function ConnectionsProvider({ children }) {

    const [connections, setConnections] = useState(null);

    useEffect(() => {

        const getConnections = async (page, connectionsToLoad) => {
            const response = await makeFetchPost('http://localhost:3000/connections/selectFriends', {
                page,
                connectionsToLoad
            });

            if (!response) return false;

            setConnections(response);
        }

        // getConnections();

    }, [])

    return <ConnectionsContext.Provider value={ connections }>
        { children }
    </ConnectionsContext.Provider>
}