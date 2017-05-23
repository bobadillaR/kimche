import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

export default class ViewMessages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: {},
      schools: {},
      messages: {},
    };
  }

  componentWillMount() {
    const { database } = this.props;
    database.child('users').on('value', users => this.setState({ users: users.val() }));
    database.child('schools').on('value', schools => this.setState({ schools: schools.val() }));
    database.child('messages').on('value', schools => this.setState({ messages: schools.val() }));
  }

  findTeacher(key) {
    const { users, messages } = this.state;
    return messages[key].teachers !== undefined ? Object.entries(messages[key].teachers).map(([teacher]) => <p key={teacher}>{users[teacher].nombre}</p>) : '';
  }

  findAdmin(key) {
    const { users, messages } = this.state;
    return messages[key].admins !== undefined ? Object.entries(messages[key].admins).map(([admin]) => <p key={admin}>{users[admin].nombre}</p>) : '';
  }

  render() {
    const { messages, schools } = this.state;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4} >
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>Avisos</h1>
            <Link to="/admin/messages/create">
              <RaisedButton primary icon={<FontIcon className="material-icons" >message</FontIcon>} label="Crear Aviso" />
            </Link>
          </div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="Tabla de Usuarios" style={{ textAlign: 'center' }}>
                  Tabla de Avisos
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="Nombre del Aviso">Colegio</TableHeaderColumn>
                <TableHeaderColumn tooltip="Administradores son usuarios que pueden ver todos los mensajes del colegio">Hora de Creacion</TableHeaderColumn>
                <TableHeaderColumn tooltip="Administradores son usuarios que pueden ver todos los mensajes del colegio">Administradores</TableHeaderColumn>
                <TableHeaderColumn tooltip="Profesores solo pueden ver sus mensajes">Profesores</TableHeaderColumn>
                <TableHeaderColumn tooltip="Profesores solo pueden ver sus mensajes">Mensaje</TableHeaderColumn>
                <TableHeaderColumn tooltip="Editar">Editar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover displayRowCheckbox={false}>
              {Object.entries(messages).map(([key, value]) => (
                <TableRow key={key}>
                  <TableRowColumn>{schools[value.school] && schools[value.school].nombre}</TableRowColumn>
                  <TableRowColumn>{value.createData}</TableRowColumn>
                  <TableRowColumn>{this.findTeacher(key)}</TableRowColumn>
                  <TableRowColumn>{this.findAdmin(key)}</TableRowColumn>
                  <TableRowColumn>{value.text}</TableRowColumn>
                  <TableRowColumn style={{ cursor: 'pointer', alignItems: 'center', display: 'flex' }} onTouchTap={() => this.props.history.push(`/admin/messages/edit/${key}`)}>Editar <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
