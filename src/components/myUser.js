import React, { Component } from 'react';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import Message from './utilities/message';

export default class MyUSer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordView: false,
      loading: false,
      alert: '',
    };
  }

  componentWillMount() {
    const { userData } = this.props;
    this.setState({
      name: userData.name,
      rut: userData.rut,
      email: userData.email,
      cellphone: userData.cellphone,
      tipo: userData.tipo,
      alert: false,
      alertType: 'success',
    });
  }

  edit() {
    const { name, cellphone } = this.state;
    const { userAdmin, user } = this.props;
    if (name && cellphone) {
      this.setState({ loading: true });
      firebase.database().ref(`${userAdmin ? 'admins' : 'teachers'}/${user.uid}`).update({
        name,
        cellphone,
      })
      .then(this.setState({ loading: false, alert: `Usuario ${name} fue editado correctamente`, alertType: 'success' }));
    }
  }

  changePassword() {
    const { newPassword, confirmPassword, oldPassword } = this.state;
    const { auth } = this.props;
    const user = auth.currentUser;
    if (newPassword === confirmPassword) {
      user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, oldPassword)).then(() =>
        user.updatePassword(newPassword).then(
          this.setState({ loading: false, alert: 'Contraseña actualizada correctamente', alertType: 'success' }),
          error => this.setState({ error }),
        ), () => this.setState({ loading: false, alert: 'Las contraseñas anterior es incorrecta.', alertType: 'danger' }));
    } else this.setState({ loading: false, alert: 'Las contraseñas no coinciden, intentalo nuevamente', alertType: 'danger' });
  }

  changeMail() {
    const { newMail, oldPassword } = this.state;
    const { auth, database } = this.props;
    const user = auth.currentUser;
    if (newMail.includes('.') && newMail.includes('@')) {
      user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, oldPassword)).then(() =>
        user.updateEmail(newMail).then(
          database.child(user.displayName === 'admin' ? 'admins' : 'users').child(user.uid).update({ email: newMail }).then(
            this.setState({ loading: false, alert: 'Email actualizado correctamente' }),
          ), error => this.setState({ error }),
        ), () => this.setState({ loading: false, alert: 'Las contraseñas anterior es incorrecta.', alertType: 'danger' }));
    } else this.setState({ loading: false, alert: 'El mail anterior no coincide, reintentalo', alertType: 'danger' });
  }

  render() {
    const { name, errorName, loading, cellphone, errorCelular, passwordView, newPassword, confirmPassword, oldPassword, alert, emailView, newMail, alertType } = this.state;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4}>
          <h2>Editar Usuario {name}</h2>
          <Divider />
          {alert && <Message message={alert} tipo={alertType} time={4000} onClose={() => this.setState({ alert: false })} />}
          {loading ?
            <center><CircularProgress size={80} /></center>
          :
            <div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >person_pin</FontIcon>
                <TextField value={name} floatingLabelFixed hintText="Nombre de usuario" floatingLabelText="Nombre" onChange={(event, nameVal) => this.setState({ name: nameVal })} fullWidth errorText={errorName && 'Campo obligatorio'} />
              </div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >smartphone</FontIcon>
                <TextField value={cellphone} floatingLabelFixed hintText="Celular de usuario" floatingLabelText="Celular" onChange={(event, cellphoneVal) => this.setState({ cellphone: cellphoneVal })} fullWidth errorText={errorCelular && 'Campo obligatorio'} />
              </div>
              {(passwordView || emailView) &&
                <div style={{ alignItems: 'center', display: 'flex' }}>
                  <FontIcon style={{ marginRight: '2%' }} className="material-icons" >enhanced_encryption</FontIcon>
                  <TextField value={oldPassword} type="password" floatingLabelFixed hintText="Contraseña anterior" floatingLabelText="Contraseña Previa" onChange={(event, rutVal) => this.setState({ oldPassword: rutVal })} fullWidth />
                </div>
              }
              {passwordView &&
                <div>
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <FontIcon style={{ marginRight: '2%' }} className="material-icons" >no_encryption</FontIcon>
                    <TextField value={newPassword} type="password" floatingLabelFixed hintText="Contraseña nueva" floatingLabelText="Contraseña Nueva" onChange={(event, rutVal) => this.setState({ newPassword: rutVal })} fullWidth />
                  </div>
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <FontIcon style={{ marginRight: '2%' }} className="material-icons" >vpn_key</FontIcon>
                    <TextField value={confirmPassword} type="password" floatingLabelFixed hintText="Repita contraseña nueva" floatingLabelText="Confirmación" onChange={(event, rutVal) => this.setState({ confirmPassword: rutVal })} fullWidth />
                  </div>
                </div>
              }
              {emailView &&
                <div>
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <FontIcon style={{ marginRight: '2%' }} className="material-icons" >label</FontIcon>
                    <TextField value={newMail} floatingLabelFixed hintText="Mail nuevo" floatingLabelText="Mail Nuevo" onChange={(event, rutVal) => this.setState({ newMail: rutVal })} fullWidth />
                  </div>
                </div>
              }
              <br />
              <RaisedButton
                primary
                onTouchTap={() => { if (passwordView) this.changePassword(); else this.setState({ passwordView: !passwordView }); }}
                label={passwordView ? 'Confimar cambio contraseña' : 'Cambiar Contraseña'}
                icon={<FontIcon className="material-icons" >vpn_key</FontIcon>}
              />
              <br />
              <RaisedButton
                style={{ marginTop: 10 }}
                primary
                onTouchTap={() => { if (emailView) this.changeMail(); else this.setState({ emailView: !emailView }); }}
                label={emailView ? 'Confimar cambio email' : 'Cambiar Email'}
                icon={<FontIcon className="material-icons" >email</FontIcon>}
              />
              <br />
              <br />
              <RaisedButton
                primary
                onTouchTap={() => this.edit()}
                label="Editar Usuario"
                icon={<FontIcon className="material-icons" >save</FontIcon>}
              />
            </div>
          }
        </Paper>
      </div>
    );
  }
}
