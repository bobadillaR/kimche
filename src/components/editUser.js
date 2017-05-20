import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

import ActionFavorite from 'material-ui/svg-icons/toggle/star';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/star-border';

import Message from './utilities/message';

export default class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorNombre: false,
      errorRut: false,
      errorCelular: false,
      errorMail: false,
      nombre: '',
      rut: '',
      celular: '',
      email: '',
      admin: false,
      alert: false,
    };
  }

  componentWillMount() {
    const { editable, database } = this.props;
    if (editable) {
      database.child('users').child(this.props.match.params.userId).on('value', user =>
        this.setState({ nombre: user.val().nombre, rut: user.val().rut, celular: user.val().celular, email: user.val().email, admin: user.val().admin }),
      );
    }
  }

  create() {
    const { secondaryApp, database } = this.props;
    const { nombre, email, celular, rut, admin } = this.state;
    if (nombre && rut && email) {
      this.setState({ loading: true });
      secondaryApp.auth().createUserWithEmailAndPassword(email, rut).catch(error => this.setState({ error }))
      .then(user =>
        database.child(`/users/${user.uid}`).set({
          email,
          nombre,
          visibility: true,
          admin,
          rut,
          celular,
        })
        .then(secondaryApp.auth().signOut())
        .then(this.setState({ loading: false, alert: true, nombre: '', email: '', admin: false, rut: '', celular: '' })),
      );
    } else console.log('faltan cosas');
  }

  edit() {
    const { nombre, email, celular, rut, admin } = this.state;
    const { database } = this.props;
    this.setState({ loading: true });
    if (nombre && rut && email) {
      this.setState({ loading: true });
      database.child(`/users/${this.props.match.params.userId}`).update({
        email,
        nombre,
        visibility: true,
        rut,
        celular,
        admin,
      })
      .then(this.setState({ loading: false, alert: true }));
    }
  }

  render() {
    const { loading, errorNombre, errorMail, errorCelular, errorRut, admin, nombre, celular, rut, email, alert } = this.state;
    const { editable } = this.props;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4}>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>{editable ? 'Editar' : 'Crear'} Usuario</h1>
            <Link to="/admin/users">
              <RaisedButton primary icon={<FontIcon className="material-icons" >list</FontIcon>} label="Ver Tabla" />
            </Link>
          </div>
          {alert && <Message message={`Se ha ${editable ? 'editado' : 'creado'} el usuario ${nombre}`} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
            <TextField value={nombre} floatingLabelFixed hintText="Nombre de usuario" floatingLabelText="Nombre" onChange={(event, nombreVal) => this.setState({ nombre: nombreVal })} fullWidth errorText={errorNombre && 'Campo obligatorio'} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >email</FontIcon>
            <TextField value={email} floatingLabelFixed hintText="Mail de usuario" floatingLabelText="Mail" onChange={(event, mailVal) => this.setState({ email: mailVal })} fullWidth errorText={errorMail && 'Campo obligatorio'} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >vpn_key</FontIcon>
            <TextField value={rut} floatingLabelFixed hintText="Rut de usuario" floatingLabelText="Rut / Contraseña" onChange={(event, rutVal) => this.setState({ rut: rutVal })} fullWidth errorText={errorRut && 'Campo obligatorio'} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >smartphone</FontIcon>
            <TextField value={celular} floatingLabelFixed hintText="Celular de usuario" floatingLabelText="Celular" onChange={(event, celularVal) => this.setState({ celular: celularVal })} fullWidth errorText={errorCelular && 'Campo obligatorio'} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
            {/* <TextField value={''} floatingLabelFixed hintText="Celular de usuario" floatingLabelText="Celular" onChange={(event, celularVal) => this.setState({ celular: celularVal })} fullWidth errorText={errorCelular && 'Campo obligatorio'} /> */}
          </div>
          <br />
          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label={`${!admin ? 'No es' : 'Es'} Super Administrador`}
            onCheck={(event, adminValue) => this.setState({ admin: adminValue })}
            labelStyle={{ marginLeft: '1%' }}
            checked={admin}
          />
          <br />
          <RaisedButton style={{ float: 'right' }} primary disabled={loading} icon={<FontIcon className="material-icons" >person_add</FontIcon>} label={editable ? 'Editar Usuario' : 'Crear Usuario'} onTouchTap={() => { if (editable) this.edit(); else this.create(); }} />
          <br />
          <br />
        </Paper>
      </div>
    );
  }
}

EditUser.propTypes = {
  // auth: PropTypes.shape,
  database: PropTypes.shape.isRequired,
  secondaryApp: PropTypes.shape.isRequired,
  // history: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  editable: PropTypes.shape.isRequired,
};
