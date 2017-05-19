import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

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
    database.child('userRelations').on('value', users => this.setState({ userRelations: users.val() }));
  }

  findSchool(key) {
    const { userRelations, schools } = this.state;
    if (userRelations[key] !== undefined) return Object.entries(userRelations[key]).map(([keyUser]) => <p>{schools[keyUser].nombre}</p>);
    else return '';
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
                  <TableRowColumn>{value.nombre}</TableRowColumn>
                  <TableRowColumn>{this.findSchool(key)}</TableRowColumn>
                  <TableRowColumn>{value.email}</TableRowColumn>
                  <TableRowColumn>{value.celular}</TableRowColumn>
                  <TableRowColumn style={{ cursor: 'pointer' }} onTouchTap={() => this.props.history.push(`/admin/users/edit/${key}`)}>Editar <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

ViewUsers.propTypes = {
  database: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
};
