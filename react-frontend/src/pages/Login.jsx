import { useState } from 'react';
import { makeFetchPost } from '../utils/makeFetch';

export default function Login() {
    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [checkEmail, setCheckEmail] = useState(false);

    const submitLogin = async (event) => {

        event.preventDefault();

        const response = await makeFetchPost('http://localhost:3000/auth/login', {
            username, password
        });

        if (!response) return;

        if (response.loggedIn) {
            setCheckEmail(true);
        }

    }    
    
    return <main>
    
    { checkEmail ? <p>Check your email</p> :
    <form onSubmit={ submitLogin } className="flex flex-col">
        <label htmlFor="username">
            Username:
            <input autoComplete='on' onChange={ (event) => setUsername(event.target.value) } type="text" id="username" name="username" placeholder="Username" minLength="5" maxLength="16" required />
        </label>

        <label htmlFor="password">
            Password:
            <input autoComplete='on' onChange={ (event) => setPassword(event.target.value) } type="password" id="password" name="password" placeholder="Password" required />
        </label>

        <input type="submit" value="Login" />
    </form> }


    </main>;
}