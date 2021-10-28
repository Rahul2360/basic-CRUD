import './App.css';
import UserList from './components/users-list'
import NavBar from './components/navbar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee,faPlus, faEye)
function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <UserList />

      {/* <Router>
        <Switch>
          <Route path="/">
          </Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
