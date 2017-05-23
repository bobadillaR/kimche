import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';

import Message from './utilities/message';

import logo from '../img/logoChico.png';
// import imgBlur from '../../img/schoolBlur.png';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
      loading: false,
      recoveryView: false,
      messageRecovery: false,
    };
  }

  login() {
    this.setState({ loading: true });
    const { email, password } = this.state;
    const { auth, database } = this.props;
    auth.signInWithEmailAndPassword(email, password)
    .then(user =>
      database.child(`users/${user.uid}`).on('value', (userData) => {
        if (userData.val().admin) this.props.history.push('/admin/users');
        else this.props.history.push('/main');
        this.setState({ loading: false });
      }),
    )
    .catch(error => this.setState({ error, loading: false }));
  }

  recovery() {
    this.setState({ loading: true });
    const { email } = this.state;
    const { auth } = this.props;
    auth.sendPasswordResetEmail(email).then(() => {
      this.setState({ messageRecovery: true, loading: false, recoveryView: false });
    }, error => this.setState({ error, loading: false }));
  }

  render() {
    const { error, recoveryView, loading, messageRecovery } = this.state;
    return (
      <div style={{ display: 'flex', marginTop: '10%', justifyContent: 'center' }}>
        <Paper style={{ height: '50%', width: '75%', padding: 20 }} zDepth={4} >
          <Paper zDepth={2} >
            <center>
              <img alt="presentation" src={logo} height={60} />
            </center>
          </Paper>
          {recoveryView && <Message message="Agregue el mail de usuario para enviarle un mensaje con la informacion de recuperacion de contraseña" tipo="info" />}
          {messageRecovery && <Message message="Se ha enviado un mail para restablecer su contraseña" tipo="success" time={4000} />}
          <form onSubmit={() => this.login()}>
            <TextField hintText="Mail de usuario" floatingLabelText="Mail" onChange={(event, email) => this.setState({ email })} fullWidth errorText={error && error.code.includes('mail') && 'Ingrese un mail valido'} />
            {!recoveryView && <div>
              <TextField hintText="Contraseña" floatingLabelText="Contraseña" type="password" onChange={(event, password) => this.setState({ password })} fullWidth errorText={error && error.code.includes('password') && 'Lo lamentamos no hemos podido ingresar con este usuario y contraseña'} />
              <RaisedButton onSubmit={() => this.login()} primary disabled={loading} label="Iniciar Sesión" fullWidth onTouchTap={() => this.login()} />
            </div>
            }
            <br />
          </form>
          <Divider />
          <br />
          <FlatButton label="Recuperar Contraseña" disabled={loading} primary onTouchTap={() => { if (!recoveryView) this.setState({ recoveryView: true }); else this.recovery(); }} fullWidth={recoveryView} icon={<FontIcon className="material-icons" >vpn_key</FontIcon>} />
          {recoveryView &&
            <div>
              <br />
              <Divider />
              <br />
              <FlatButton label="Volver" disabled={loading} primary onTouchTap={() => this.setState({ recoveryView: false })} fullWidth icon={<FontIcon className="material-icons" >chevron_left</FontIcon>} />
            </div>
          }
          <br />
          {loading && <center><CircularProgress size={80} thickness={5} /></center>}
        </Paper>
      </div>
    );
  }
}
