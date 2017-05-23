import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

export default class ViewSchools extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: {},
      schools: {},
    };
  }

  componentWillMount() {
    const { database } = this.props;
    database.child('users').on('value', users => this.setState({ users: users.val() }));
    database.child('schools').on('value', schools => this.setState({ schools: schools.val() }));
  }

  findTeacher(key) {
    const { users, schools } = this.state;
    if (schools[key].teachers !== undefined) return Object.entries(schools[key].teachers).map(([keyUser, value]) => value && users[keyUser]).map(user => <p>{user.nombre}</p>);
    else return '';
  }

  findAdmin(key) {
    const { users, schools } = this.state;
    if (schools[key].admins !== undefined) return Object.entries(schools[key].admins).map(([keyUser, value]) => value && users[keyUser]).map(user => <p>{user.nombre}</p>);
    else return '';
  }

  render() {
    const { schools } = this.state;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4} >
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>Colegios</h1>
            <Link to="/admin/schools/create">
              <RaisedButton primary icon={<FontIcon className="material-icons" >school</FontIcon>} label="Crear Colegio" />
            </Link>
          </div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="4" tooltip="Tabla de Usuarios" style={{ textAlign: 'center' }}>
                  Tabla de Colegios
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="Nombre del Colegio">Nombre</TableHeaderColumn>
                <TableHeaderColumn tooltip="Administradores son usuarios que pueden ver todos los mensajes del colegio">Administradores</TableHeaderColumn>
                <TableHeaderColumn tooltip="Profesores solo pueden ver sus mensajes">Profesores</TableHeaderColumn>
                <TableHeaderColumn tooltip="Editar">Editar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover displayRowCheckbox={false}>
              {Object.entries(schools).map(([key, value]) => (
                <TableRow key={key}>
                  <TableRowColumn>{value.nombre}</TableRowColumn>
                  <TableRowColumn>{this.findAdmin(key)}</TableRowColumn>
                  <TableRowColumn>{this.findTeacher(key)}</TableRowColumn>
                  <TableRowColumn style={{ cursor: 'pointer', alignItems: 'center', display: 'flex' }} onTouchTap={() => this.props.history.push(`/admin/schools/edit/${key}`)}>Editar <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
