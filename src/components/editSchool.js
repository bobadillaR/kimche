import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import Message from './utilities/message';

export default class EditSchool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorNombre: false,
      nombre: '',
      alert: false,
      users: {},
      schools: false,
      schoolId: false,
      initialUser: false,
      teachers: [],
      initialTeacher: [],
      admins: [],
      initialAdmin: [],
    };
  }

  componentWillMount() {
    const { editable, database } = this.props;
    const schoolId = this.props.match.params.schoolId;
    if (editable) {
      this.setState({ schoolId, loading: true });
      database.child('schools').child(this.props.match.params.schoolId).on('value', (school) => {
        if (school.val() !== null) {
          this.setState({
            nombre: school.val().nombre,
            initialTeacher: school.val().teachers !== undefined ? Object.entries(school.val().teachers).map(([keyUser, value]) => value && keyUser) : [],
            teachers: school.val().teachers !== undefined ? Object.entries(school.val().teachers).map(([keyUser, value]) => value && keyUser) : [],
            initialAdmin: school.val().admins !== undefined ? Object.entries(school.val().admins).map(([keyUser, value]) => value && keyUser) : [],
            admins: school.val().admins !== undefined ? Object.entries(school.val().admins).map(([keyUser, value]) => value && keyUser) : [],
            loading: false,
          });
        } else this.setState({ loading: false });
      });
    }
    database.child('users').on('value', users => this.setState({ users: users.val() }));
  }

  create() {
    const { database } = this.props;
    const { nombre, admins, teachers } = this.state;
    if (nombre) {
      this.setState({ loading: true });
      const update = {};
      const schoolKey = database.child('school').push().key;
      teachers.forEach((key) => {
        update[`users/${key}/teachers/${schoolKey}`] = true;
        update[`schools/${schoolKey}/teachers/${key}`] = true;
      });
      admins.forEach((key) => {
        update[`users/${key}/admins/${schoolKey}`] = true;
        update[`schools/${schoolKey}/admins/${key}`] = true;
      });
      database.child('schools').child(schoolKey).update({
        nombre,
      })
      .then(database.update(update))
      .then(this.setState({ loading: false, alert: true }));
    }
  }

  edit() {
    const { database } = this.props;
    const { nombre, admins, teachers, schoolId, initialTeacher, initialAdmin } = this.state;
    if (nombre) {
      this.setState({ loading: true });
      const update = {};

      const oldTeachers = [];
      const newTeachers = [];
      const oldAdmins = [];
      const newAdmins = [];

      if (initialTeacher.length > 0) initialTeacher.forEach((auxOldTeacher) => { if (teachers.indexOf(auxOldTeacher) < 0) oldTeachers.push(auxOldTeacher); });
      if (initialAdmin.length > 0) initialAdmin.forEach((auxOldAdmin) => { if (admins.indexOf(auxOldAdmin) < 0) oldAdmins.push(auxOldAdmin); });
      if (teachers.length > 0) teachers.forEach((auxNewTeacher) => { if (initialTeacher.indexOf(auxNewTeacher) < 0) newTeachers.push(auxNewTeacher); });
      if (admins.length > 0) admins.forEach((auxNewAdmin) => { if (initialAdmin.indexOf(auxNewAdmin) < 0) newAdmins.push(auxNewAdmin); });

      oldTeachers.forEach((oldTeacher) => {
        update[`schools/${schoolId}/teachers/${oldTeacher}`] = null;
        update[`users/${oldTeacher}/teachers/${schoolId}`] = null;
      });
      newTeachers.forEach((newTeacher) => {
        update[`schools/${schoolId}/teachers/${newTeacher}`] = true;
        update[`users/${newTeacher}/teachers/${schoolId}`] = true;
      });
      oldAdmins.forEach((oldAdmin) => {
        update[`schools/${schoolId}/admins/${oldAdmin}`] = null;
        update[`users/${oldAdmin}/admins/${schoolId}`] = null;
      });
      newAdmins.forEach((newAdmin) => {
        update[`schools/${schoolId}/admins/${newAdmin}`] = true;
        update[`users/${newAdmin}/admins/${schoolId}`] = true;
      });
      database.child('schools').child(schoolId).update({
        nombre,
      })
      .then(database.update(update))
      .then(this.setState({ loading: false, alert: true }));
    }
    this.setState({ loading: false });
  }

  render() {
    const { loading, errorNombre, nombre, alert, admins, teachers, users } = this.state;
    const { editable } = this.props;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4}>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>{editable ? 'Editar' : 'Crear'} Colegio</h1>
            <Link to="/admin/schools">
              <RaisedButton primary icon={<FontIcon className="material-icons" >list</FontIcon>} label="Ver Tabla" />
            </Link>
          </div>
          {loading && <center><CircularProgress size={80} thickness={5} /></center>}
          {alert && <Message message={`Se ha ${editable ? 'editado' : 'creado'} el colegio ${nombre}`} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
            <TextField value={nombre} floatingLabelFixed hintText="Nombre de Colegio" floatingLabelText="Nombre" onChange={(event, nombreVal) => this.setState({ nombre: nombreVal })} fullWidth errorText={errorNombre && 'Campo obligatorio'} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >assignment_ind</FontIcon>
            <SelectField multiple value={admins} floatingLabelFixed hintText="Administradores del colegio" floatingLabelText="Administradores" onChange={(event, index, value) => this.setState({ admins: value })} fullWidth >
              {Object.entries(users).map(([key, value]) => (
                <MenuItem key={key} value={key} primaryText={value.nombre} />
              ))}
            </SelectField>

          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
            <SelectField multiple value={teachers} floatingLabelFixed hintText="Profesores del colegio" floatingLabelText="Profesores" onChange={(event, index, value) => this.setState({ teachers: value })} fullWidth >
              {Object.entries(users).map(([key, value]) =>
                <MenuItem key={key} value={key} primaryText={value.nombre} />,
              )}
            </SelectField>
          </div>
          <br />
          <RaisedButton style={{ float: 'right' }} primary disabled={loading} icon={<FontIcon className="material-icons" >{editable ? 'edit' : 'add_circle'}</FontIcon>} label={editable ? 'Editar Colegio' : 'Crear Colegio'} onTouchTap={() => { if (editable) this.edit(); else this.create(); }} />
          <br />
          <br />
        </Paper>
      </div>
    );
  }
}

EditSchool.propTypes = {
  // auth: PropTypes.shape,
  database: PropTypes.shape.isRequired,
  // secondaryApp: PropTypes.shape.isRequired,
  // history: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  editable: PropTypes.shape.isRequired,
};
