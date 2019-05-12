import * as React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from "./pages/login";
import Home from './pages/home';
import Signup from './pages/signup';
import Profile from './pages/profile';
import { UserContextProvider } from './contexts/user-context';
import { BookContextProvider } from './contexts/books-context';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default () => (
  <BrowserRouter>
    <UserContextProvider>
      <BookContextProvider>
        <App />
      </BookContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
