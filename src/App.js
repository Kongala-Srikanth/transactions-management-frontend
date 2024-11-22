import {Switch, Route, Redirect} from 'react-router-dom'
import TransactionHistory from './components/TransactionHistory'
import TransactionFullDetails from './components/TransactionFullDetails'
import Login from './components/Login'
import Register from './components/Register'
import CreateTransaction from './components/CreateTransaction'
import UserProfile from './components/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import './App.css';


function App() {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/profile' component={UserProfile} />
      <ProtectedRoute exact path='/transaction/details/:id' component={TransactionFullDetails} />
      <ProtectedRoute exact path='/transaction' component={CreateTransaction} />
      <ProtectedRoute exact path='/transactions' component={TransactionHistory} />
    </Switch>
  );
}

export default App;
