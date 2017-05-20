import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import ReactGA from 'react-ga';
import MobileDetect from 'mobile-detect';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory';

import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import Login from './components/login';
import EditUser from './components/editUser';
import ViewUsers from './components/viewUsers';
import EditSchool from './components/editSchool';
import ViewSchools from './components/viewSchools';
import EditMessage from './components/editMessage';
import ViewMessages from './components/viewMessages';

import './App.css';

// TODO: review ga
ReactGA.initialize('UA-97048045-2', {
  debug: true,
});

const history = createHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

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
      mobileDetect,
      user: false,
      userData: {},
      secondaryApp: firebase.initializeApp(config, 'Secondary'),
      update: true,
      database: firebase.database().ref(),
      auth: firebase.auth(),
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user =>
      user && firebase.database().ref(`users/${user.uid}`).on('value', userData =>
        this.setState({ userData: userData.val(), user }),
      ),
    );
  }

  componentWillUpdate() {
    const { update } = this.state;
    if (update) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref(`users/${user.uid}`).on('value', userData => this.setState({ userData: userData.val(), user }));
        } else {
          this.setState({ user: false });
        }
        this.setState({ update: false });
      });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <Router history={history}>
        <div>
          <Navbar history={history} {...this.state} />
          <Route exact path="/" render={props => <LandingPage {...this.state} {...props} />} />
          <Route path="/login" render={props => <Login {...this.state} {...props} />} />
          {user && <Route exact path="/admin/users/create" render={props => <EditUser editable={false} {...this.state} {...props} />} />}
          {user && <Route exact path="/admin/users/edit/:userId" render={props => <EditUser editable {...this.state} {...props} />} />}
          {user && <Route exact path="/admin/users" render={props => <ViewUsers {...this.state} {...props} />} />}
          {user && <Route exact path="/admin/schools/create" render={props => <EditSchool editable={false} {...this.state} {...props} />} />}
          {user && <Route exact path="/admin/schools/edit/:schoolId" render={props => <EditSchool editable {...this.state} {...props} />} />}
          {user && <Route exact path="/admin/schools" render={props => <ViewSchools {...this.state} {...props} />} />}
          {user && <Route exact path="/admin/messages/create" render={props => <EditMessage editable={false} {...this.state} {...props} />} />}
          {user && <Route exact path="/admin/messages/edit/:messageId" render={props => <EditMessage editable {...this.state} {...props} />} />}
          {user && <Route exact path="/admin/messages" render={props => <ViewMessages {...this.state} {...props} />} />}
        </div>
      </Router>
    );
  }
}
