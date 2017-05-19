import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import PropTypes from 'prop-types';
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
      schoolRelations: {},
    };
  }

  componentWillMount() {
    const { database } = this.props;
    database.child('users').on('value', users => this.setState({ users: users.val() }));
    database.child('schools').on('value', schools => this.setState({ schools: schools.val() }));
    database.child('schoolRelations').on('value', (schools) => {
      if (schools.val() !== null) this.setState({ schoolRelations: schools.val() });
    });
  }

  findUser(key, tipo) {
    const { schoolRelations, users } = this.state;
    if (schoolRelations[key] !== undefined) {
      const usersFinded = Object.entries(schoolRelations[key]).map(([keyUser, value]) => value === tipo && users[keyUser]);
      return usersFinded.map(user => <p>{user.nombre}</p>);
    } else return '';
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
                  <TableRowColumn>{this.findUser(key, 'A')}</TableRowColumn>
                  <TableRowColumn>{this.findUser(key, 'T')}</TableRowColumn>
                  <TableRowColumn style={{ cursor: 'pointer' }} onTouchTap={() => this.props.history.push(`/admin/schools/edit/${key}`)}>Editar <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

ViewSchools.propTypes = {
  database: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
};
