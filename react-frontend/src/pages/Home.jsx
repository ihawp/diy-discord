import { useContext, useState } from 'react';

import { TeamsContext } from '../providers/TeamsProvider';
import CreateTeamForm from '../components/CreateTeamForm';

export default function Home() {
    
    const { ownedTeams } = useContext(TeamsContext);
    
    return <main>

        <section>
            <h2>Your Teams:</h2>

            {ownedTeams.length > 0 ? ownedTeams.map((item, key) => {
                return <div key={key} className="flex flex-row justify-between">
                    <img src={item.logo_url || '/default-logo.png'} />
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
            }) : <p>You have no teams, create a team</p>}

        </section>

        <section>
            <h2>Your Connections:</h2>

            {/* Print connections (friends) here */}
        </section>

        <CreateTeamForm />

    </main>
}