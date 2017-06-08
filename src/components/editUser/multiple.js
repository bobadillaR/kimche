import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
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
    const { data, validator } = this.state;
    const { secondaryApp, database } = this.props;
    data.forEach((userData, i) => {
      secondaryApp.auth().createUserWithEmailAndPassword(userData.Mail, '123456')
      .then(user =>
        database.child(`'users'}/${user.uid}`).set({
          email: userData.Mail,
          name: userData.Nombre,
          visibility: true,
          rut: userData.RUT,
          cellphone: userData.Telefono,
          admin: false,
          createDate: moment().unix(),
        }))
      .then(() => secondaryApp.auth().currentUser.updateProfile({ displayName: 'normal' }))
      .then(() => secondaryApp.auth().signOut())
      .then(() => { validator[i] = 2; this.setState({ validator }); if (i === data.length) this.setState({ alert: true }); })
      .catch((error) => { validator[i] = 0; this.setState({ error, validator }); });
    });
  }

  chargeData(textValue) {
    const data = JSON.parse(textValue);
    let validatorGeneral = true;
    const validator = data.map((element) => {
      if (element.RUT !== '' && element.Nombre !== '' && element.Mail !== '' && element.Telefono !== '') return 1;
      else { validatorGeneral = false; return 0; }
    });
    this.setState({ data: JSON.parse(textValue), validator, validatorGeneral });
  }

  render() {
    const { data, validator, statusIcon, validatorGeneral, alert } = this.state;
    return (
      <Paper style={{ margin: '5%', padding: '3%', marginTop: 0 }} zDepth={4}>
        <TextField fullWidth floatingLabelFixed hintText="Script JSON" floatingLabelText="JSON" onChange={(e, textValue) => this.chargeData(textValue)} />
        {alert && <Message message={'Se han creado todos los usuarios'} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
        {/* <SelectField value={school} hintText="Nombre del colegio" floatingLabelText="Colegio" onChange={(event, index, value) => this.setState({ school: value })} fullWidth>
          {Object.entries(schools).map(([key, value]) => (
            <MenuItem key={key} value={key} primaryText={value.name} />
          ))}
        </SelectField> */}
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
                <TableRowColumn>{value.Nombre}</TableRowColumn>
                <TableRowColumn>{value.Mail}</TableRowColumn>
                <TableRowColumn>{value.Telefono}</TableRowColumn>
                <TableRowColumn><FontIcon className="material-icons" >{statusIcon[validator[i]]}</FontIcon></TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <RaisedButton disabled={validatorGeneral} style={{ float: 'right' }} primary icon={<FontIcon className="material-icons" >person_add</FontIcon>} label="Crear todos los usuarios" onTouchTap={() => this.create()} />
      </Paper>
    );
  }
}
