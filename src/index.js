import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import ReactGA from 'react-ga';
import MobileDetect from 'mobile-detect';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey800, white } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import LandingPage2 from './components/landingPage2';
import Login from './components/login';
import MyUser from './components/myUser';

import EditUser from './components/editUser';
import ViewUsers from './components/viewUsers';
import EditSchool from './components/editSchool';
import ViewSchools from './components/viewSchools';
import EditMessage from './components/editMessage';
import ViewMessages from './components/viewMessages';

import Main from './components/main';

import './index.css';

const muiTheme = getMuiTheme({
  toolbar: {
    height: 60, // Instead of 64
    backgroundColor: grey800,
    iconColor: white,
  },
});


// TODO: review ga

ReactGA.initialize('UA-97048045-2', {
  debug: true,
});

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

injectTapEventPlugin();

export default class App extends Component {
  constructor(props) {
    super(props);
    const config = {
      apiKey: 'AIzaSyD2FgC94jHT3aKDQihS3jwfFyTu3iumteM',
      authDomain: 'kimche-web.firebaseapp.com',
      databaseURL: 'https://kimche-web.firebaseio.com',
      projectId: 'kimche-web',
      storageBucket: 'kimche-web.appspot.com',
      messagingSenderId: '53601270408',
    };
    firebase.initializeApp(config);
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    this.state = {
      mobileDetect: mobileDetect.mobile(),
      user: false,
      userData: {},
      secondaryApp: firebase.initializeApp(config, 'Secondary'),
      update: true,
      database: firebase.database().ref(),
      auth: firebase.auth(),
      config,
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', () => this.setState({ height: window.innerHeight, width: window.innerWidth }));
    this.login();
  }

  componentWillUpdate() {
    const { update } = this.state;
    if (update) {
      this.login();
    }
  }

  login() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === 'admin') firebase.database().ref().child(`admins/${user.uid}`).on('value', userData => this.setState({ userData: userData.val(), user, update: false, userAdmin: true }));
        else firebase.database().ref().child(`users/${user.uid}`).on('value', userData => this.setState({ userData: userData.val(), user, update: false, userAdmin: false }));
      } else this.setState({ update: false });
    });
  }

  logout() {
    firebase.auth().signOut().then(() => this.setState({ userData: {}, user: false, userAdmin: false }));
  }

  render() {
    const { userAdmin, update, user } = this.state;
    return (
      <Router onUpdate={logPageView} style={{ margin: '0 !important' }} >
        <MuiThemeProvider muiTheme={muiTheme} style={{ margin: 0 }}>
          <div>
            <Navbar {...this.state} onLogout={() => this.logout()} />
            <Route exact path="/" render={props => <LandingPage {...this.state} {...props} />} />
            <Route path="/landingPage" render={props => <LandingPage2 {...this.state} {...props} />} />
            <Route path="/login" render={props => <Login {...this.state} {...props} onLogin={() => this.login()} />} />
            {(update && !user) ?
              <center style={{ marginTop: '20%' }}><CircularProgress size={120} /></center>
              :
              <div>
                <Route path="/myUser" render={props => <MyUser {...this.state} {...props} onLogin={() => this.login()} />} />
                {/* {userAdmin && <Route exact path="/admin/" render={() => this.tester()} /> } */}
                {userAdmin && <Route exact path="/admin/users/create" render={props => <EditUser editable={false} {...this.state} {...props} />} />}
                {userAdmin && <Route exact path="/admin/users/edit/:isAdmin/:userId" render={props => <EditUser editable {...this.state} {...props} />} />}
                {userAdmin && <Route exact path="/admin/users" render={props => <ViewUsers {...this.state} {...props} />} />}
                {userAdmin && <Route exact path="/admin/schools/create" render={props => <EditSchool editable={false} {...this.state} {...props} />} />}
                {userAdmin && <Route exact path="/admin/schools/edit/:schoolId" render={props => <EditSchool editable {...this.state} {...props} />} />}
                {userAdmin && <Route exact path="/admin/schools" render={props => <ViewSchools {...this.state} {...props} />} />}
                {userAdmin && <Route exact path="/admin/messages/create" render={props => <EditMessage editable={false} {...this.state} {...props} />} />}
                {userAdmin && <Route exact path="/admin/messages/edit/:messageId" render={props => <EditMessage editable {...this.state} {...props} />} />}
                {userAdmin && <Route exact path="/admin/messages" render={props => <ViewMessages {...this.state} {...props} />} />}
                {!userAdmin && <Route exact path="/main" render={props => <Main {...this.state} {...props} />} />}
              </div>
            }
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
