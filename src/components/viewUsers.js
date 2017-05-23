import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { yellow500 } from 'material-ui/styles/colors';

// TODO: add loading

export default class ViewUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: {},
      userRelations: {},
      schools: {},
    };
  }

  componentWillMount() {
    const { database } = this.props;
    database.child('users').on('value', users => this.setState({ users: users.val() }));
    database.child('schools').on('value', schools => this.setState({ schools: schools.val() }));
    // database.child('userRelations').on('value', users => this.setState({ userRelations: users.val() }));
  }

  findSchool(key) {
    const { users, schools } = this.state;
    const schoolsValue = [];
    if (users[key].admins !== undefined) Object.entries(users[key].admins).map(([keySchools]) => schoolsValue.push(<p style={{ alignItems: 'center', display: 'flex' }} ><FontIcon className="material-icons" >assignment_ind</FontIcon> {schools[keySchools].nombre}</p>));
    if (users[key].teachers !== undefined) Object.entries(users[key].teachers).map(([keySchools]) => schoolsValue.push(<p style={{ alignItems: 'center', display: 'flex' }}><FontIcon className="material-icons" >face</FontIcon> {schools[keySchools].nombre}</p>));
    return schoolsValue;
    // if (users[key].teachers !== undefined) console.log(Object.entries(users[key].teachers).map(([keySchools]) => schools[keySchools]).map(user => <p>{user.nombre} - Teacher</p>));
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4} >
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>Usuarios</h1>
            <Link to="/admin/users/create">
              <RaisedButton primary icon={<FontIcon className="material-icons" >person_add</FontIcon>} label="Crear Usuario" />
            </Link>
          </div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="Tabla de Usuarios" style={{ textAlign: 'center' }}>
                  Tabla de Usuarios
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="Rut">Rut</TableHeaderColumn>
                <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Colegio">Colegio</TableHeaderColumn>
                <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
                <TableHeaderColumn tooltip="Celular">Celular</TableHeaderColumn>
                <TableHeaderColumn tooltip="Editar">Editar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover displayRowCheckbox={false}>
              {Object.entries(users).map(([key, value]) => (
                <TableRow key={key}>
                  <TableRowColumn>{value.rut}</TableRowColumn>
                  <TableRowColumn style={{ alignItems: 'center', display: 'flex' }}>{value.admin && <FontIcon color={yellow500} className="material-icons" >star</FontIcon>}{value.nombre}</TableRowColumn>
                  <TableRowColumn>{this.findSchool(key)}</TableRowColumn>
                  <TableRowColumn>{value.email}</TableRowColumn>
                  <TableRowColumn>{value.celular}</TableRowColumn>
                  <TableRowColumn style={{ alignItems: 'center', display: 'flex', cursor: 'pointer' }} onTouchTap={() => this.props.history.push(`/admin/users/edit/${key}`)}>Editar <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
