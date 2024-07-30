import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetail from './components/ContactDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={ContactList} />
          <Route path="/add" component={ContactForm} />
          <Route path="/edit/:id" component={ContactForm} />
          <Route path="/details/:id" component={ContactDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
