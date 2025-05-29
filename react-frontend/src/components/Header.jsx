import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AccountContext } from '../providers/AccountProvider';

export default function Header() {

    const { account } = useContext(AccountContext);

    return <header>
        
        <div>
            <img src={account.pfp_url} />
        </div>
        <p>
            {account.username}
            <br/>
            {account.email}
        </p>
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
            </ul>
        </nav>

    </header>
}