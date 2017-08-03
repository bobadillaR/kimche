import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import Checkbox from 'material-ui/Checkbox';
import { cyan500, red500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import Multiple from './multiple';
import Message from '../utilities/message';

export default class EditMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorSchool: false,
      errorTitle: false,
      errorType: false,
      texto: '',
      alert: false,
      schools: '',
      school: '',
      tipo: '',
      initialUser: false,
      teachers: [],
      admins: [],
      tipoList: { felicitar: 'Felicitar', apoyar: 'Apoyar', corregir: 'Corregir', conservar: 'Conservar', soporte: 'Soporte' },
      temaList: { asistencia: 'Asistencia', notas: 'Notas' },
      tema: '',
      title: '',
      visibility: true,
      userId: '',
      redirect: false,
      table: [],
      tab: true,
    };
  }

  componentWillMount() {
    const { editable, database } = this.props;
    this.setState({ loading: true });
    database.child('schools').on('value', (schools) => {
      this.setState({ schools: schools.val() });
      if (editable) {
        const messageId = this.props.match.params.messageId;
        database.child('messages').child(messageId).on('value', (message) => {
          this.setState({
            messageId,
            texto: message.val().text || '',
            tipo: message.val().tipo || '',
            tema: message.val().tema || '',
            title: message.val().title || '',
            school: message.val().schoolId || '',
            teachers: !message.val().admin ? message.val().userId : '',
            admins: message.val().admin ? message.val().userId : '',
            loading: false,
            message: message.val() || '',
            userId: message.val().userId || '',
            table: message.val().table || [],
            que: message.val().que || '',
            porque: message.val().porque || '',
            editDate: message.val().editDate || '',
          });
        });
      } else this.setState({ loading: false });
    });
  }

  create() {
    const { database } = this.props;
    const { texto, admins, teachers, school, tipo, title, schools, table, tema } = this.state;
    if (texto && school && tipo) {
      this.setState({ loading: true });
      const update = {};
      let messageKey = '';
      teachers.forEach((userKey) => {
        messageKey = database.child('school').push().key;
        update[`messages/${messageKey}/title`] = title;
        update[`messages/${messageKey}/text`] = texto;
        update[`messages/${messageKey}/tipo`] = tipo;
        update[`messages/${messageKey}/tema`] = tema;
        update[`messages/${messageKey}/state`] = 0;
        update[`messages/${messageKey}/table`] = table;
        update[`messages/${messageKey}/admin`] = false;
        update[`messages/${messageKey}/visibility`] = true;
        update[`messages/${messageKey}/createDate`] = moment().unix();
        update[`messages/${messageKey}/editDate`] = moment().unix();
        update[`schools/${school}/messages/${messageKey}`] = moment().unix();
        update[`users/${userKey}/schools/${school}/messages/${messageKey}`] = moment().unix();
        update[`messages/${messageKey}/schoolId`] = school;
        update[`messages/${messageKey}/schoolName`] = schools[school].name;
        update[`messages/${messageKey}/userId`] = userKey;
        update[`messages/${messageKey}/userName`] = schools[school].teachers[userKey];
      });
      admins.forEach((userKey) => {
        messageKey = database.child('school').push().key;
        update[`messages/${messageKey}/title`] = title;
        update[`messages/${messageKey}/text`] = texto;
        update[`messages/${messageKey}/tipo`] = tipo;
        update[`messages/${messageKey}/tema`] = tema;
        update[`messages/${messageKey}/table`] = table;
        // update[`messages/${messageKey}/tableTitle`] = tableTitle;
        update[`messages/${messageKey}/state`] = 0;
        update[`messages/${messageKey}/admin`] = true;
        update[`messages/${messageKey}/visibility`] = true;
        update[`messages/${messageKey}/createDate`] = moment().unix();
        update[`messages/${messageKey}/editDate`] = moment().unix();
        update[`schools/${school}/messages/${messageKey}`] = moment().unix();
        update[`users/${userKey}/schools/${school}/messages/${messageKey}`] = moment().unix();
        update[`messages/${messageKey}/schoolId`] = school;
        update[`messages/${messageKey}/schoolName`] = schools[school].name;
        update[`messages/${messageKey}/userId`] = userKey;
        update[`messages/${messageKey}/userName`] = schools[school].admins[userKey];
      });
      database.update(update)
      .then(this.setState({ loading: false, alert: true, texto: '', title: '', school: '', teachers: [], admins: [], tipo: '', tema: '', errorSchool: false, errorText: false, errorTitle: false, errorType: false, table: [], tableTitle: '' }));
    } if (title === '') this.setState({ errorTitle: true });
    if (school === '') this.setState({ errorSchool: true });
    if (tipo === '') this.setState({ errorType: true });
  }

  edit() {
    const { database } = this.props;
    const { texto, school, tipo, messageId, title, visibility, message, table, tema } = this.state;
    if (texto && school && tipo) {
      this.setState({ loading: true });
      const update = {};
      update[`messages/${messageId}/title`] = title;
      update[`messages/${messageId}/visibility`] = visibility;
      update[`messages/${messageId}/text`] = texto;
      update[`messages/${messageId}/tipo`] = tipo;
      update[`messages/${messageId}/tema`] = tema;
      update[`messages/${messageId}/table`] = table;
      if (message.school !== school) {
        update[`messages/${messageId}/school`] = school;
        update[`schools/${message.school}/message/${messageId}`] = null;
      }
      database.update(update)
      .then(this.setState({ loading: false, alert: true }));
    } if (title === '') this.setState({ errorTitle: true });
    if (school === '') this.setState({ errorSchool: true });
    if (tipo === '') this.setState({ errorType: true });
  }

  delete() {
    const { database } = this.props;
    const { school, messageId, userId } = this.state;
    const update = {};
    this.setState({ loading: true });
    update[`messages/${messageId}`] = null;
    update[`schools/${school}/messages/${messageId}`] = null;
    update[`users/${userId}/schools/${school}/messages/${messageId}`] = null;
    database.update(update)
    .then(this.setState({ redirect: '/admin/messages' }));
  }

  renderSingle() {
    const { loading, errorTitle, alert, texto, admins, school, teachers, schools, tipoList, tipo, title, visibility, errorType, errorSchool, table, tableTitle, temaList, tema } = this.state;
    const { editable } = this.props;
    return (
      <Paper style={{ margin: '5%', padding: '3%', marginTop: !editable ? 0 : '5%' }} zDepth={4}>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <h1>{editable ? 'Editar' : 'Crear'} Aviso</h1>
          <Link to="/admin/messages">
            <RaisedButton primary icon={<FontIcon className="material-icons" >list</FontIcon>} label="Ver Tabla" />
          </Link>
        </div>
        {loading && <center><CircularProgress size={80} thickness={5} /></center>}
        {alert && <Message message={`Se ha ${editable ? 'editado' : 'creado'} el colegio ${texto}`} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <FontIcon style={{ marginRight: '2%' }} className="material-icons" >title</FontIcon>
          <TextField value={title} hintText="Titulo del aviso" floatingLabelText="Titulo" onChange={(event, textoVal) => this.setState({ title: textoVal })} fullWidth errorText={errorTitle && 'Campo obligatorio'} />
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <FontIcon style={{ marginRight: '2%' }} className="material-icons" >message</FontIcon>
          <TextField multiLine rows={2} value={texto} hintText="Texto del aviso" floatingLabelText="Texto" onChange={(event, textoVal) => this.setState({ texto: textoVal })} fullWidth />
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
          <SelectField value={school} disabled={editable} hintText="Nombre del colegio" floatingLabelText="Colegio" onChange={(event, index, value) => this.setState({ school: value })} fullWidth errorText={errorSchool && 'Campo obligatorio'}>
            {Object.entries(schools).map(([key, value]) => (
              <MenuItem key={key} value={key} primaryText={value.name} />
            ))}
          </SelectField>
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <FontIcon style={{ marginRight: '2%' }} className="material-icons" >assignment_ind</FontIcon>
          <SelectField multiple value={admins} disabled={schools[school] === undefined || editable} hintText="Administradores del colegio" floatingLabelText="Administradores" onChange={(event, index, value) => this.setState({ admins: value })} fullWidth >
            {schools[school] !== undefined && schools[school].admins !== undefined &&
              Object.entries(schools[school].admins).map(([key, value]) =>
                <MenuItem key={key} value={key} primaryText={value} checked={admins.indexOf(key) > -1} />,
            )}
          </SelectField>
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
          <SelectField multiple value={teachers} disabled={schools[school] === undefined || editable} floatingLabelFixed hintText="Profesores del colegio" floatingLabelText="Profesores" onChange={(event, index, value) => this.setState({ teachers: value })} fullWidth >
            {schools[school] !== undefined && schools[school].teachers !== undefined &&
              Object.entries(schools[school].teachers).map(([key, value]) =>
                <MenuItem key={key} value={key} primaryText={value} checked={teachers.indexOf(key) > -1} />,
            )}
          </SelectField>
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <FontIcon style={{ marginRight: '2%' }} className="material-icons" >feedback</FontIcon>
          <SelectField value={tipo} floatingLabelFixed hintText="Tipo de aviso" floatingLabelText="Tipo" onChange={(event, index, value) => this.setState({ tipo: value })} fullWidth errorText={errorType && 'Campo obligatorio'}>
            {Object.entries(tipoList).map(([key, value]) =>
              <MenuItem key={key} value={key} primaryText={value} />,
            )}
          </SelectField>
        </div>
        {tipo !== 'soporte' &&
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >message</FontIcon>
            <SelectField value={tema} floatingLabelFixed hintText="Tema" floatingLabelText="Tema" onChange={(event, index, value) => this.setState({ tema: value })} fullWidth errorText={errorType && 'Campo obligatorio'}>
              {Object.entries(temaList).map(([key, value]) =>
                <MenuItem key={key} value={key} primaryText={value} />,
              )}
            </SelectField>
          </div>
        }
        <div>
          <Table selectable={false} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Tabla de Datos" style={{ textAlign: 'center' }}>
                  <TextField value={tableTitle} floatingLabelText="Titulo" hintText="Nombre de la tabla" onChange={(event, textoVal) => this.setState({ tableTitle: textoVal })} />
                  <RaisedButton style={{ marginLeft: '10%' }} primary icon={<FontIcon className="material-icons" >add</FontIcon>} label="Agregar fila" onTouchTap={() => { table.push({ data: '', student: '' }); this.setState({ table }); }} />
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="Nombre del alumno">Nombre</TableHeaderColumn>
                <TableHeaderColumn tooltip="Dato">Dato</TableHeaderColumn>
                <TableHeaderColumn tooltip="Eliminar">Eliminar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover displayRowCheckbox={false}>
              {table.map((data, key) =>
                (<TableRow key={data.student} >
                  <TableRowColumn>
                    <TextField value={data.student} hintText="Nombre del Alumno" onChange={(event, textoVal) => { table[key].student = textoVal; this.setState({ table }); }} fullWidth />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField value={data.data} hintText="Dato del Alumno" onChange={(event, textoVal) => { table[key].data = textoVal; this.setState({ table }); }} fullWidth />
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => { table.splice(key, 1); this.setState({ table }); }}><FontIcon className="material-icons" >delete</FontIcon></IconButton>
                  </TableRowColumn>
                </TableRow>),
              )}
            </TableBody>
          </Table>
        </div>
        <br />
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
        <RaisedButton style={{ float: 'right' }} primary disabled={loading} icon={<FontIcon className="material-icons" >{editable ? 'edit' : 'add_circle'}</FontIcon>} label={editable ? 'Guardar Aviso' : 'Crear Aviso'} onTouchTap={() => { if (editable) this.edit(); else this.create(); }} />
        <br />
        <br />
        {editable &&
          <div>
            <br />
            <RaisedButton backgroundColor={red500} style={{ float: 'right' }} icon={<FontIcon className="material-icons" >delete</FontIcon>} label="Eliminar Mensaje" onTouchTap={() => this.delete()} />
            <br />
          </div>
        }
      </Paper>
    );
  }

  render() {
    const { redirect, tab } = this.state;
    const { editable } = this.props;
    if (redirect) return <Redirect to={redirect} />;
    return (
      <div>
        {!editable &&
          <Tabs style={{ margin: '5%', marginBottom: 0 }} onChange={() => this.setState({ tab: !tab })}>
            <Tab
              icon={<FontIcon className="material-icons">add_box</FontIcon>}
              label="Nuevo Aviso"
            />
            <Tab
              icon={<FontIcon className="material-icons">library_add</FontIcon>}
              label="Nuevos Avisos"
            />
          </Tabs>
        }
        {tab ?
          this.renderSingle()
          :
          <Multiple {...this.props} />
        }
      </div>
    );
  }
}
