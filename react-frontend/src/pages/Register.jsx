import { useState } from 'react';
import { makeFetchPost } from '../utils/makeFetch';

export default function Register() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);

    const submitLogin = async (event) => {

        event.preventDefault();

        const response = await makeFetchPost('http://localhost:3000/auth/register', {
            username, email, password
        });

        if (!response) return;

        console.log(response);

        if (response.registered) {
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

        <label htmlFor="username">
            Email:
            <input autoComplete='on' onChange={ (event) => setEmail(event.target.value) } type="email" id="email" name="email" placeholder="Email" required />
        </label>

        <label htmlFor="password">
            Password:
            <input autoComplete='on' onChange={ (event) => setPassword(event.target.value) } type="password" id="password" name="password" placeholder="Password" required />
        </label>

        <input type="submit" value="Login" />
    </form> }


    </main>;
}