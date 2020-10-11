import React from 'react';
import { Grommet } from 'grommet';
import theme from './theme.json';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Answer } from './answers/Answer.jsx'
import './App.css';

function App() {
  return (
    <Grommet theme={theme}>
      <Router>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Switch>
            <Route path="/answer">
              <Answer />
            </Route>
          </Switch>
        </div>
      </Router>
    </Grommet>
  );
}

export default App;
