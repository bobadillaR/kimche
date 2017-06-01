import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import Checkbox from 'material-ui/Checkbox';
import { cyan500 } from 'material-ui/styles/colors';

import Message from './utilities/message';

export default class EditSchool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorName: false,
      name: '',
      alert: false,
      users: {},
      schools: false,
      schoolId: false,
      teachers: [],
      admins: [],
      visibility: true,
    };
  }

  componentWillMount() {
    const { editable, database } = this.props;
    const schoolId = this.props.match.params.schoolId;
    if (editable) {
      this.setState({ loading: true });
      database.child('schools').child(this.props.match.params.schoolId).on('value', (school) => {
        if (school.val() !== null) {
          this.setState({
            name: school.val().name,
            teachers: school.val().teachers !== undefined ? Object.keys(school.val().teachers) : [],
            admins: school.val().admins !== undefined ? Object.keys(school.val().admins) : [],
            school: school.val(),
            loading: false,
            schoolId,
          });
        } else this.setState({ loading: false });
      });
    }
    database.child('users').on('value', users => this.setState({ users: users.val() || {} }));
  }

  create() {
    const { database } = this.props;
    const { users, name, admins, teachers, visibility } = this.state;
    if (name) {
      this.setState({ loading: true });
      const update = {};
      const schoolKey = database.child('school').push().key;
      teachers.forEach((user) => {
        update[`users/${user}/schools/${schoolKey}/name`] = name;
        update[`users/${user}/schools/${schoolKey}/admin`] = false;
        update[`schools/${schoolKey}/teachers/${user}`] = users[user].name;
      });
      admins.forEach((user) => {
        update[`users/${user}/schools/${schoolKey}/name`] = name;
        update[`users/${user}/schools/${schoolKey}/admin`] = true;
        update[`schools/${schoolKey}/admins/${user}`] = users[user].name;
      });
      update[`schools/${schoolKey}/name`] = name;
      update[`schools/${schoolKey}/visibility`] = visibility;
      update[`schools/${schoolKey}/createDate`] = moment().format('DD-MM-YYYY, h:mm a');
      database.update(update)
      .then(this.setState({ loading: false, alert: true, name: '' }));
    } else this.setState({ errorName: true });
  }

  edit() {
    const { database } = this.props;
    const { name, admins, teachers, schoolId, school, users, visibility } = this.state;
    if (name) {
      this.setState({ loading: true });
      const update = {};
      update[`schools/${schoolId}/name`] = name;
      update[`schools/${schoolId}/visibility`] = visibility;
      if (school.teachers !== undefined) {
        teachers.filter(teacher => Object.keys(school.teachers).indexOf(teacher) < 0).forEach((teacher) => {
          update[`schools/${schoolId}/teachers/${teacher}`] = users[teacher].name;
          update[`users/${teacher}/schools/${schoolId}/name`] = name;
          update[`users/${teacher}/schools/${schoolId}/admin`] = false;
        });
        Object.keys(school.teachers).filter(teacher => teachers.indexOf(teacher) < 0).forEach((teacher) => {
          update[`schools/${schoolId}/teachers/${teacher}`] = null;
          update[`users/${teacher}/schools/${schoolId}/name`] = null;
          update[`users/${teacher}/schools/${schoolId}/admin`] = null;
        });
      } else {
        teachers.forEach((teacher) => {
          update[`schools/${schoolId}/teachers/${teacher}`] = users[teacher].name;
          update[`users/${teacher}/schools/${schoolId}/name`] = name;
          update[`users/${teacher}/schools/${schoolId}/admin`] = false;
        });
      }
      if (school.admins !== undefined) {
        admins.filter(admin => Object.keys(school.admins).indexOf(admin) < 0).forEach((admin) => {
          update[`schools/${schoolId}/admins/${admin}`] = users[admin].name;
          update[`users/${admin}/schools/${schoolId}/name`] = name;
          update[`users/${admin}/schools/${schoolId}/admin`] = true;
        });
        Object.keys(school.admins).filter(admin => admins.indexOf(admin) < 0).forEach((admin) => {
          update[`schools/${schoolId}/admins/${admin}`] = null;
          if (teachers.indexOf(admin) < 0) {
            update[`users/${admin}/schools/${schoolId}/name`] = null;
            update[`users/${admin}/schools/${schoolId}/admin`] = null;
          }
        });
      } else {
        admins.forEach((admin) => {
          update[`schools/${schoolId}/admins/${admin}`] = users[admin].name;
          update[`users/${admin}/schools/${schoolId}/name`] = name;
          update[`users/${admin}/schools/${schoolId}/admin`] = true;
        });
      }
      database.update(update)
      .then(this.setState({ loading: false, alert: true, errorName: false }));
    } else this.setState({ errorName: true });
  }

  render() {
    const { loading, errorName, name, alert, admins, teachers, users, visibility } = this.state;
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
          {alert && <Message message={`Se ha ${editable ? 'editado' : 'creado'} el colegio ${name}`} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
            <TextField value={name} floatingLabelFixed hintText="Nombre de Colegio" floatingLabelText="Nombre" onChange={(event, nameVal) => this.setState({ name: nameVal })} fullWidth errorText={errorName && 'Campo obligatorio'} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >assignment_ind</FontIcon>
            <SelectField multiple value={admins} floatingLabelFixed hintText="Administradores del colegio" floatingLabelText="Administradores" onChange={(event, index, value) => this.setState({ admins: value })} fullWidth >
              {Object.keys(users).filter(key => teachers.indexOf(key) < 0).map(key => <MenuItem key={key} checked={admins.indexOf(key) > -1} value={key} primaryText={users[key].name} />)}
            </SelectField>

          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
            <SelectField multiple value={teachers} floatingLabelFixed hintText="Profesores del colegio" floatingLabelText="Profesores" onChange={(event, index, value) => this.setState({ teachers: value })} fullWidth >
              {Object.keys(users).filter(key => admins.indexOf(key) < 0).map(key => <MenuItem key={key} checked={teachers.indexOf(key) > -1} value={key} primaryText={users[key].name} />)}
            </SelectField>
          </div>
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
          <RaisedButton style={{ float: 'right' }} primary disabled={loading} icon={<FontIcon className="material-icons" >{editable ? 'edit' : 'add_circle'}</FontIcon>} label={editable ? 'Editar Colegio' : 'Crear Colegio'} onTouchTap={() => { if (editable) this.edit(); else this.create(); }} />
          <br />
          <br />
        </Paper>
      </div>
    );
  }
}
