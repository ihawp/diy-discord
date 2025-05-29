import { useContext, useState } from 'react';
import { AccountContext } from '../providers/AccountProvider';
import { makeFetchPost } from '../utils/makeFetch';

const UpdateEmailForm = () => {

    const { account, setAccount } = useContext(AccountContext);

    const [newEmail, setNewEmail] = useState('');

    const updateEmail = async (event) => {

        event.preventDefault();

        if (newEmail === account.email) return;

        const response = await makeFetchPost('http://localhost:3000/accounts/update-email', {
            email: newEmail
        });

        if (!response) return false;

        console.log(response);

        // logic will change if I am going to send a magic link, response will be true
        // and then it will say to check email.
        if (response.emailUpdated) {
            console.log(response.newEmail);
            setAccount(prev => ({ ...prev, email: response.newEmail }));
        }

    }

    return <section>
        <form onSubmit={ updateEmail }>
            <label htmlFor="email">
                Update Email:
                <input onChange={ event => setNewEmail(event.target.value)} type="email" name="email" id="email" value={newEmail} placeholder={ account.email } required />
            </label>
            <input type="submit" value="Change Email" />
        </form>
    </section>
}

export default UpdateEmailForm;