// src/App.tsx
import { Route, Switch, Redirect } from 'wouter';
import authService from './services/authService';
import './App.css';
import SignUp from './pages/Auth/sign-up';
import SignIn from './pages/Auth/sign-in';
import Dashboard from './pages/Dashboard/main-dashboard';

function App() {
  const isAuth = authService.isAuthenticated();

  return (
    <Switch>
      <Route path="/signup">
        {isAuth ? <Redirect to="/dashboard" /> : <SignUp />}
      </Route>

      <Route path="/signin">
        {isAuth ? <Redirect to="/dashboard" /> : <SignIn />}
      </Route>

      <Route path="/dashboard">
        {isAuth ? <Dashboard /> : <Redirect to="/signin" />}
      </Route>

      <Route path="/">
        {isAuth ? <Redirect to="/dashboard" /> : <Redirect to="/signin" />}
      </Route>

      <Route>
        <Redirect to={isAuth ? "/dashboard" : "/signin"} />
      </Route>
    </Switch>
  );
}

export default App;