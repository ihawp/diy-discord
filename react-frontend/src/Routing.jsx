import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AccountContext } from './providers/AccountProvider';

import Header from './components/Header';
import NotLoggedHeader from './components/NotLoggedHeader';
import Footer from './components/Footer';

import Home from './pages/Home';
import HomeNotLogged from './pages/HomeNotLogged';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';

export default function Routing() {

    const { verified } = useContext(AccountContext);

    if (verified) {
        return <>
            <Header />
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="*" element={ <Error /> } />
            </Routes>
            <Footer />
        </>
    } else {
        return <>
            <NotLoggedHeader />
            <Routes>
                <Route path="/" element={ <HomeNotLogged /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="*" element={ <Error /> } />
            </Routes>
            <Footer />
        </>
    }

}