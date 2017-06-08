import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Message from '../utilities/message';

export default class Multple extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      validator: [],
      validatorGeneral: true,
      statusIcon: ['report', 'done', 'done_all'],
      alert: false,
      school: '',
      schools: {},
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.child('schools').on('value', schools => this.setState({ schools: schools.val() }));
  }

  create() {
    const { data, validator, school, schools } = this.state;
    const { secondaryApp, database } = this.props;
    data.forEach((userData, i) => {
      secondaryApp.auth().createUserWithEmailAndPassword(userData.Mail, '123456')
      .then((user) => {
        const update = {};
        update[`users/${user.uid}/name`] = userData.Nombre;
        update[`users/${user.uid}/email`] = userData.Mail;
        update[`users/${user.uid}/visibility`] = true;
        update[`users/${user.uid}/rut`] = userData.RUT;
        update[`users/${user.uid}/cellphone`] = userData.Telefono;
        update[`users/${user.uid}/admin`] = false;
        update[`schools/${school}/createDate`] = moment().unix();
        update[`users/${user.uid}/schools/${school}/name`] = schools[school].name;
        update[`users/${user.uid}/schools/${school}/admin`] = userData.Admin === 1;
        update[`schools/${school}/${userData.Admin === 1 ? 'admins' : 'teachers'}/${user.uid}`] = userData.Nombre;
        database.update(update)
        .then(() => { validator[i] = 2; this.setState({ validator }); if (i === data.length) this.setState({ alert: true }); })
        .catch((error) => { validator[i] = 0; this.setState({ error, validator }); });
      })
      .then(() => secondaryApp.auth().currentUser.updateProfile({ displayName: 'normal' }))
      .then(() => secondaryApp.auth().signOut());
    });
  }

  chargeData(textValue) {
    const data = JSON.parse(textValue);
    let validatorGeneral = false;
    const validator = data.map((element) => {
      if (element.RUT !== '' && element.Nombre !== '' && element.Mail !== '') return 1;
      else { validatorGeneral = true; return 0; }
    });
    this.setState({ data: JSON.parse(textValue), validator, validatorGeneral });
  }

  render() {
    const { data, validator, statusIcon, validatorGeneral, alert, school, schools } = this.state;
    return (
      <Paper style={{ margin: '5%', padding: '3%', marginTop: 0 }} zDepth={4}>
        <TextField fullWidth floatingLabelFixed hintText="Script JSON" floatingLabelText="JSON" onChange={(e, textValue) => this.chargeData(textValue)} />
        {alert && <Message message={'Se han creado todos los usuarios'} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
        <SelectField value={school} hintText="Nombre del colegio" floatingLabelText="Colegio" onChange={(event, index, value) => this.setState({ school: value })} fullWidth>
          {Object.entries(schools).map(([key, value]) => (
            <MenuItem key={key} value={key} primaryText={value.name} />
          ))}
        </SelectField>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="5" tooltip="Tabla de Usuarios" style={{ textAlign: 'center' }}>
                Tabla de Usuarios
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="Rut">Rut</TableHeaderColumn>
              <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
              <TableHeaderColumn tooltip="Celular">Celular</TableHeaderColumn>
              <TableHeaderColumn tooltip="Celular">Estado</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover displayRowCheckbox={false}>
            {data.map((value, i) => (
              <TableRow>
                <TableRowColumn>{value.RUT}</TableRowColumn>
                <TableRowColumn><FontIcon className="material-icons" >{value.Admin === 1 ? 'assignment_ind' : 'face'}</FontIcon>{value.Nombre}</TableRowColumn>
                <TableRowColumn>{value.Mail}</TableRowColumn>
                <TableRowColumn>{value.Telefono}</TableRowColumn>
                <TableRowColumn><FontIcon className="material-icons" >{statusIcon[validator[i]]}</FontIcon></TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <RaisedButton disabled={(!validatorGeneral && school === '')} style={{ float: 'right' }} primary icon={<FontIcon className="material-icons" >person_add</FontIcon>} label="Crear todos los usuarios" onTouchTap={() => this.create()} />
      </Paper>
    );
  }
}
