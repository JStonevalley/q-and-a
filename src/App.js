import React from 'react';
import { Grommet } from 'grommet';
import theme from './theme.json';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Answer } from './answers/Answer.jsx'
import { QuestionsCreator } from './question-set/QuestionsCreator.jsx'
import { QuestionSessionController } from './question-set/QuestionSessionController.jsx'
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

function App() {
  return (
    <Grommet theme={theme}>
      <Router>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Switch>
            <Route path="/answer/:id?" component={Answer} />
            <Route path="/questions-creator/:id?" component={QuestionsCreator} />
            <Route path="/question-session-controller/:id?" component={QuestionSessionController} />
          </Switch>
        </div>
      </Router>
    </Grommet>
  );
}

export default App;
