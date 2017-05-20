import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import Message from './utilities/message';

export default class EditMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorNombre: false,
      texto: '',
      alert: false,
      users: {},
      schools: {},
      schoolId: '',
      initialUser: false,
      teachers: [],
      teachersList: [],
      admins: [],
      adminsList: [],
      tipoList: { felicitar: 'Felicitar', apoyar: 'Apoyar', corregir: 'Corregir', conservar: 'Conservar', soporte: 'Soporte' },
    };
  }

  componentWillMount() {
    const { editable, database } = this.props;
    const messageId = this.props.match.params.messageId;
    this.setState({ messageId, loading: true });
    database.child('users').on('value', users => this.setState({ users: users.val() }));
    database.child('schools').on('value', (schools) => {
      this.setState({ schools: schools.val() });
      if (editable) {
        database.child('messages').child(this.props.match.params.messageId).on('value', (message) => {
          this.setState({
            messageId,
            texto: message.val().text,
            tipo: message.val().tipo,
            school: message.val().school,
            oldSchool: message.val().school,
            teachers: message.val().teachers !== undefined ? Object.entries(message.val().teachers).map(([key]) => key) : [],
            initialTeacher: message.val().teachers !== undefined ? Object.entries(message.val().teachers).map(([key]) => key) : [],
            admins: message.val().admins !== undefined ? Object.entries(message.val().admins).map(([key]) => key) : [],
            initialAdmin: message.val().admins !== undefined ? Object.entries(message.val().admins).map(([key]) => key) : [],
            loading: false,
          });
        });
      }
    });
  }

  componentDidMount() {
    const { editable } = this.props;
    const { school } = this.state;
    if (editable) {
      this.findUsers(school);
    }
  }

  create() {
    const { database } = this.props;
    const { texto, admins, teachers, school, tipo } = this.state;
    if (texto && school && tipo) {
      this.setState({ loading: true });
      const update = {};
      const messageKey = database.child('school').push().key;
      update[`messages/${messageKey}/text`] = texto;
      update[`messages/${messageKey}/tipo`] = tipo;
      update[`schools/${school}/messages/${messageKey}`] = true;
      update[`messages/${messageKey}/school`] = school;
      update[`messages/${messageKey}/estate`] = 0;
      update[`messages/${messageKey}/createData`] = moment().format('DD-MM-YYYY, h:mm a');
      teachers.forEach((userKey) => {
        update[`users/${userKey}/messages/${messageKey}`] = true;
        update[`messages/${messageKey}/teachers/${userKey}`] = true;
      });
      admins.forEach((userKey) => {
        update[`users/${userKey}/messages/${messageKey}`] = true;
        update[`messages/${messageKey}/admins/${userKey}`] = true;
      });
      database.update(update)
      .then(this.setState({ loading: false, alert: true }));
    }
  }

  edit() {
    const { database } = this.props;
    const { texto, admins, teachers, school, tipo, initialAdmin, initialTeacher, messageId, oldSchool } = this.state;
    if (texto && school && tipo) {
      this.setState({ loading: true });
      const update = {};
      update[`messages/${messageId}/text`] = texto;
      update[`messages/${messageId}/tipo`] = tipo;
      update[`schools/${school}/messages/${messageId}`] = true;
      if (oldSchool !== school) {
        update[`messages/${messageId}/school`] = school;
        update[`schools/${oldSchool}/message`] = null;
      }
      const oldTeachers = [];
      const newTeachers = [];
      const oldAdmins = [];
      const newAdmins = [];

      if (initialTeacher.length > 0) initialTeacher.forEach((auxOldTeacher) => { if (teachers.indexOf(auxOldTeacher) < 0) oldTeachers.push(auxOldTeacher); });
      if (initialAdmin.length > 0) initialAdmin.forEach((auxOldAdmin) => { if (admins.indexOf(auxOldAdmin) < 0) oldAdmins.push(auxOldAdmin); });
      if (teachers.length > 0) teachers.forEach((auxNewTeacher) => { if (initialTeacher.indexOf(auxNewTeacher) < 0) newTeachers.push(auxNewTeacher); });
      if (admins.length > 0) admins.forEach((auxNewAdmin) => { if (initialAdmin.indexOf(auxNewAdmin) < 0) newAdmins.push(auxNewAdmin); });

      oldTeachers.forEach((oldTeacher) => {
        update[`messages/${messageId}/teachers/${oldTeacher}`] = null;
        update[`users/${oldTeacher}/messages/${messageId}`] = null;
      });
      newTeachers.forEach((newTeacher) => {
        update[`messages/${messageId}/teachers/${newTeacher}`] = true;
        update[`users/${newTeacher}/messages/${messageId}`] = true;
      });
      oldAdmins.forEach((oldAdmin) => {
        update[`messages/${messageId}/admins/${oldAdmin}`] = null;
        update[`users/${oldAdmin}/messages/${messageId}`] = null;
      });
      newAdmins.forEach((newAdmin) => {
        update[`messages/${messageId}/admins/${newAdmin}`] = true;
        update[`users/${newAdmin}/messages/${messageId}`] = true;
      });
      database.update(update)
      .then(this.setState({ loading: false, alert: true }));
    }
    this.setState({ loading: false });
  }

  findUsers(value) {
    const { users, schools } = this.state;
    const adminsList = {};
    const teachersList = {};
    Object.entries(schools[value].admins).forEach(([key]) => adminsList[key] = users[key]);
    Object.entries(schools[value].teachers).forEach(([key]) => teachersList[key] = users[key]);
    this.setState({
      school: value,
      teachersList,
      adminsList,
    });
  }

  render() {
    const { loading, errorNombre, alert, texto, admins, school, teachers, schools, teachersList, adminsList, tipoList, tipo } = this.state;
    const { editable } = this.props;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4}>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>{editable ? 'Editar' : 'Crear'} Aviso</h1>
            <Link to="/admin/messages">
              <RaisedButton primary icon={<FontIcon className="material-icons" >list</FontIcon>} label="Ver Tabla" />
            </Link>
          </div>
          {loading && <center><CircularProgress size={80} thickness={5} /></center>}
          {alert && <Message message={`Se ha ${editable ? 'editado' : 'creado'} el colegio ${texto}`} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >message</FontIcon>
            <TextField value={texto} floatingLabelFixed hintText="Texto del aviso" floatingLabelText="Texto" onChange={(event, textoVal) => this.setState({ texto: textoVal })} fullWidth errorText={errorNombre && 'Campo obligatorio'} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
            <SelectField value={school} floatingLabelFixed hintText="Nombre del colegio" floatingLabelText="Colegio" onChange={(event, index, value) => this.findUsers(value)} fullWidth >
              {Object.entries(schools).map(([key, value]) => (
                <MenuItem key={key} value={key} primaryText={value.nombre} />
              ))}
            </SelectField>
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >assignment_ind</FontIcon>
            <SelectField multiple value={admins} disabled={adminsList.length === 0} floatingLabelFixed hintText="Administradores del colegio" floatingLabelText="Administradores" onChange={(event, index, value) => this.setState({ admins: value })} fullWidth >
              {Object.entries(adminsList).map(([key, value]) =>
                <MenuItem key={key} value={key} primaryText={value.nombre} />,
              )}
            </SelectField>

          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
            <SelectField multiple value={teachers} disabled={teachersList.length === 0} floatingLabelFixed hintText="Profesores del colegio" floatingLabelText="Profesores" onChange={(event, index, value) => this.setState({ teachers: value })} fullWidth >
              {Object.entries(teachersList).map(([key, value]) =>
                <MenuItem key={key} value={key} primaryText={value.nombre} />,
              )}
            </SelectField>
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >feedback</FontIcon>
            <SelectField value={tipo} floatingLabelFixed hintText="Tipo de aviso" floatingLabelText="Tipo" onChange={(event, index, value) => this.setState({ tipo: value })} fullWidth >
              {Object.entries(tipoList).map(([key, value]) =>
                <MenuItem key={key} value={key} primaryText={value} />,
              )}
            </SelectField>
          </div>
          <br />
          <RaisedButton style={{ float: 'right' }} primary disabled={loading} icon={<FontIcon className="material-icons" >{editable ? 'edit' : 'add_circle'}</FontIcon>} label={editable ? 'Editar Aviso' : 'Crear Aviso'} onTouchTap={() => { if (editable) this.edit(); else this.create(); }} />
          <br />
          <br />
        </Paper>
      </div>
    );
  }
}

EditMessage.propTypes = {
  // auth: PropTypes.shape,
  database: PropTypes.shape.isRequired,
  // secondaryApp: PropTypes.shape.isRequired,
  // history: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  editable: PropTypes.shape.isRequired,
};
