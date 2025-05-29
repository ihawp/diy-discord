import { useContext, useState } from 'react';
import { makeFetchPost } from '../utils/makeFetch';
import { AccountContext } from '../providers/AccountProvider';

const UpdateUsernameForm = () => {

    const { account, setAccount } = useContext(AccountContext);

    const [newUsername, setNewUsername] = useState('');

    const updateUsername = async (event) => {

        // Prevent page reload.
        event.preventDefault();

        // Return if newUsername is the same username as before.
        if (newUsername === account.username) return;

        // Yes this route uses a '-' to seperate words, I think I will do this for all routes, I like the syntax much more.
        const response = await makeFetchPost('http://localhost:3000/accounts/update-username', {
            username: newUsername
        });

        // After filtering: if the response is false then stop execution
        if (!response) return;

        // Likely to be true here no matter what, but still worth checking!
        if (response.usernameUpdated) {

            // Set the new username from server response.
            setAccount(prev => ({ ...prev, username: response.newUsername }));
        }

    }

    return <section>
        <form onSubmit={ updateUsername }>
            <label htmlFor="username">
                Update Username:
                <input type="text" onChange={ event => setNewUsername(event.target.value)} value={newUsername} name="username" id="username" placeholder={ account.username } minLength={5} maxLength={16} required />
            </label>
            <input type="submit" value="Change Username" />
        </form>
    </section>;
}

export default UpdateUsernameForm;