import { useContext, useState } from 'react';
import { makeFetchPost } from '../utils/makeFetch';
import { TeamsContext } from '../providers/TeamsProvider';

/**
 * Create a new team
 * 
 * @returns Create a new team form
 */

const teamTemplate = {
    name: '',
    description: '',
    private: 0
}

export default function CreateTeamForm() {

    const { ownedTeams, setOwnedTeams } = useContext(TeamsContext);

    const [teamForm, setTeamForm] = useState(teamTemplate);
    
    const createTeam = async (event) => {
    
        event.preventDefault();

        event.target[0].value = event.target[1].value = event.target[2].value = '';

        const response = await makeFetchPost('http://localhost:3000/teams/create', teamForm);

        if (!response) return false;

        setOwnedTeams(prev => ([ ...prev, teamForm ]));

        setTeamForm(teamTemplate);

    }

    return <section>
        <h2>Create Team</h2>
        <form onSubmit={ createTeam }>
            <label htmlFor="name">
                Team Name:
                <input onChange={ event => setTeamForm(prev => ({ ...prev, name: event.target.value })) } type="text" name="name" id="name" placeholder="Team Name" maxLength="255" required />
            </label>
            <label htmlFor="description">
                Description:
                <input onChange={ event => setTeamForm(prev => ({ ...prev, description: event.target.value })) } type="text" name="description" id="description" placeholder="Team Description" maxLength="255" required />
            </label>
            <label htmlFor="private">
                Private:
                <input onChange={ event => setTeamForm(prev => ({ ...prev, private: !prev.private })) } type="checkbox" name="private[]" id="private" placeholder="Private Team" />
            </label>
            <input type="submit" value="Create Team" />
        </form>
    </section>
}