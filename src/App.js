import React from 'react';
import { Grommet } from 'grommet';
import theme from './theme.json';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Answer } from './answers/Answer.jsx'
import { QuestionSetController } from './question-set/QuestionSetController.jsx'
import './App.css';
import * as firebase from 'firebase/app'
import 'firebase/database'

firebase.initializeApp({
  apiKey: "AIzaSyDwZ0I52Cspf0aIui4WWr-6jUBZAoP28B0",
  authDomain: "q-and-a-292116.firebaseapp.com",
  databaseURL: "https://q-and-a-292116.firebaseio.com",
  projectId: "q-and-a-292116",
  storageBucket: "q-and-a-292116.appspot.com",
  messagingSenderId: "209384965317",
  appId: "1:209384965317:web:552852f1ae5e25ab175cac"
});

const database = firebase.database()

function App() {
  return (
    <Grommet theme={theme}>
      <Router>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Switch>
            <Route path="/answer">
              <Answer database={database} />
            </Route>
            <Route path="/question-set-controller/:id?" component={QuestionSetController} />
          </Switch>
        </div>
      </Router>
    </Grommet>
  );
}

export default App;
