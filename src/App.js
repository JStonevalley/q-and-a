import React from 'react';
import logo from './logo.svg';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading } from'rebass'
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Heading
        fontSize={[ 5, 6, 7 ]}
        color='primary'>
        Hello
      </Heading>
    </ThemeProvider>
  );
}

export default App;
