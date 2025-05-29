import { BrowserRouter } from 'react-router-dom';

import Routing from './Routing';

// Providers
import AccountProvider from './providers/AccountProvider';
import TeamsProvider from './providers/TeamsProvider';

export default function App() {
  return <BrowserRouter>
  
  <AccountProvider>
  <TeamsProvider>

    <Routing />

  </TeamsProvider>
  </AccountProvider>

  </BrowserRouter>
}