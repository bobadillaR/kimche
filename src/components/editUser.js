import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ActionFavorite from 'material-ui/svg-icons/toggle/star';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/star-border';
import { cyan500 } from 'material-ui/styles/colors';

import Message from './utilities/message';

export default class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorName: false,
      errorRut: false,
      errorCelular: false,
      errorEmail: false,
      name: '',
      rut: '',
      cellphone: '',
      email: '',
      admin: false,
      alert: false,
      visibility: true,
      schools: {},
    };
  }

  componentWillMount() {
    const { editable, database, match } = this.props;
    if (editable) {
      this.setState({ loading: true });
      database.child(match.params.isAdmin).child(match.params.userId).on('value', user =>
        this.setState({ user: user.val(), name: user.val().name, rut: user.val().rut, cellphone: user.val().cellphone, email: user.val().email, admin: user.val().admin, loading: false, schools: user.val().schools || {} }),
      );
    }
  }

  create() {
    const { secondaryApp, database } = this.props;
    const { name, email, cellphone, rut, admin } = this.state;
    if (name && rut && email) {
      this.setState({ loading: true });
      secondaryApp.auth().createUserWithEmailAndPassword(email, rut)
      .then(user =>
        database.child(`/${admin ? 'admins' : 'users'}/${user.uid}`).set({
          email,
          name,
          visibility: true,
          rut,
          cellphone,
          admin,
          createDate: moment().format('DD-MM-YYYY, h:mm a'),
        }),
      )
      .then(() => secondaryApp.auth().currentUser.updateProfile({ displayName: admin ? 'admin' : 'normal' }))
      .then(() => secondaryApp.auth().signOut())
      .then(this.setState({
        loading: false,
        alert: true,
        name: '',
        email: '',
        admin: false,
        rut: '',
        cellphone: '',
        errorName: false,
        errorRut: false,
        errorEmail: false,
      }))
      .catch(error => this.setState({ error }));
    } if (name === '') this.setState({ errorName: true });
    if (rut === '') this.setState({ errorRut: true });
    if (email === '') this.setState({ errorEmail: true });
  }

  edit() {
    const { name, email, cellphone, rut, admin } = this.state;
    const { database, match } = this.props;
    if (name !== undefined && rut !== undefined && email !== undefined) {
      this.setState({ loading: true });
      database.child(`/${match.params.isAdmin}/${match.params.userId}`).update({
        name,
        visibility: true,
        rut,
        cellphone,
        admin,
      })
      .then(this.setState({ loading: false, alert: true }))
      .catch(error => this.setState({ error }));
    } if (name === undefined) this.setState({ errorName: true });
    if (rut === undefined) this.setState({ errorRut: true });
    if (email === undefined) this.setState({ errorEmail: true });
  }

  render() {
    const { loading, errorName, errorEmail, errorCelular, errorRut, admin, name, cellphone, rut, email, alert, visibility, schools } = this.state;
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
          {alert && <Message message={`Se ha ${editable ? 'editado' : 'creado'} el usuario ${name}`} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
          {loading ?
            <center><CircularProgress size={80} /></center>
            :
            <div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >person_pin</FontIcon>
                <TextField value={name} floatingLabelFixed hintText="Nombre de usuario" floatingLabelText="Nombre" onChange={(event, nameVal) => this.setState({ name: nameVal })} fullWidth errorText={errorName && 'Campo obligatorio'} />
              </div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >email</FontIcon>
                <TextField value={email} disabled={editable} floatingLabelFixed hintText="Mail de usuario" floatingLabelText="Mail" onChange={(event, mailVal) => this.setState({ email: mailVal })} fullWidth errorText={errorEmail && 'Campo obligatorio'} />
              </div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >vpn_key</FontIcon>
                <TextField value={rut} floatingLabelFixed hintText="Rut de usuario" floatingLabelText="Rut / Contraseña" onChange={(event, rutVal) => this.setState({ rut: rutVal })} fullWidth errorText={errorRut && 'Campo obligatorio'} />
              </div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >smartphone</FontIcon>
                <TextField value={cellphone} floatingLabelFixed hintText="Celular de usuario" floatingLabelText="Celular" onChange={(event, cellphoneVal) => this.setState({ cellphone: cellphoneVal })} fullWidth errorText={errorCelular && 'Campo obligatorio'} />
              </div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >assignment_ind</FontIcon>
                <SelectField disabled multiple value={Object.keys(schools).filter(key => schools[key].admin)} floatingLabelFixed hintText="Administrador del colegio " floatingLabelText="Administrador" onChange={(event, cellphoneVal) => this.setState({ cellphone: cellphoneVal })} fullWidth errorText={errorCelular && 'Campo obligatorio'} >
                  {Object.keys(schools).map(key => <MenuItem key={key} value={key} primaryText={schools[key].name} />)}
                </SelectField>
              </div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
                <SelectField disabled multiple value={Object.keys(schools).filter(key => !schools[key].admin)} floatingLabelFixed hintText="Profesor del colegio " floatingLabelText="Profesor" onChange={(event, cellphoneVal) => this.setState({ cellphone: cellphoneVal })} fullWidth errorText={errorCelular && 'Campo obligatorio'} >
                  {Object.keys(schools).map(key => <MenuItem key={key} value={key} primaryText={schools[key].name} />)}
                </SelectField>
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
              {editable &&
                <Checkbox
                  checkedIcon={<FontIcon style={{ marginRight: '2%' }} color={cyan500} className="material-icons" >visibility</FontIcon>}
                  uncheckedIcon={<FontIcon style={{ marginRight: '2%' }} className="material-icons" >visibility_off</FontIcon>}
                  label={`${!visibility ? 'No es' : 'Es'} Visible`}
                  onCheck={(event, adminValue) => this.setState({ visibility: adminValue })}
                  labelStyle={{ marginLeft: '1%' }}
                  checked={visibility}
                />
              }
              <br />
              <RaisedButton style={{ float: 'right' }} primary disabled={loading} icon={<FontIcon className="material-icons" >person_add</FontIcon>} label={editable ? 'Guardar Usuario' : 'Crear Usuario'} onTouchTap={() => { if (editable) this.edit(); else this.create(); }} />
              <br />
              <br />
            </div>
          }
        </Paper>
      </div>
    );
  }
}
