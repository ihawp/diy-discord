import { useContext, useState, useEffect } from 'react';
import { makeFetchPost } from '../utils/makeFetch';
import { AccountContext } from '../providers/AccountProvider';

const UpdateUsernameForm = () => {

    const { account, setAccount } = useContext(AccountContext);

    const [newUsername, setNewUsername] = useState('');

    const updateUsername = async (event) => {

        event.preventDefault();

        const response = await makeFetchPost('http://localhost:3000/accounts/update-username', {
            username: newUsername
        });

        console.log(response);

        if (!response) return;

    }

    return <section>
        <form onSubmit={ updateUsername }>
            <label htmlFor="username">
                Update Username:
                <input type="text" onChange={ event => setNewUsername(event.target.value)} name="username" id="username" placeholder={ account.username } />
            </label>
            <input type="submit" value="Change Username" />
        </form>
    </section>;
}

export default UpdateUsernameForm;