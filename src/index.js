import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './index.css';

import App from './App';

const muiTheme = getMuiTheme({
  appBar: {
    height: 50, // Instead of 64
  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme} style={{ margin: 0 }}><App /></MuiThemeProvider>,
  document.getElementById('root'),
);
