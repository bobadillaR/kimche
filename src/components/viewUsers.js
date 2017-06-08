import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { yellow500 } from 'material-ui/styles/colors';

// TODO: add loading
// TODO: add schools

export default class ViewUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: {},
      userRelations: {},
      schools: {},
      loading: true,
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.on('value', data => this.setState({ admins: data.val().admins || {}, users: data.val().users || {}, loading: false }));
  }

  render() {
    const { loading, admins, users } = this.state;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4} >
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>Usuarios</h1>
            <div>
              <Link to="/admin/users/create">
                <RaisedButton primary icon={<FontIcon className="material-icons" >person_add</FontIcon>} label="Crear Usuario" />
              </Link>
            </div>
          </div>
          {loading ?
            <center><CircularProgress size={80} /></center>
            :
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn colSpan="5" tooltip="Tabla de Usuarios" style={{ textAlign: 'center' }}>
                    Tabla de Usuarios
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="Rut">ID</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Nombre">Nombre</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Colegio">Colegio</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Editar">Editar</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover displayRowCheckbox={false}>
                {Object.entries(users).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableRowColumn>{key}</TableRowColumn>
                    <TableRowColumn>{value.name}</TableRowColumn>
                    <TableRowColumn>{value.schools !== undefined && Object.values(value.schools).map(school => `${school.name}, `)}</TableRowColumn>
                    <TableRowColumn>{value.email}</TableRowColumn>
                    <TableRowColumn style={{ alignItems: 'center', display: 'flex', cursor: 'pointer' }} onTouchTap={() => this.props.history.push(`/admin/users/edit/users/${key}`)}>Editar <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
                  </TableRow>
                ))}
                {Object.entries(admins).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableRowColumn>{key}</TableRowColumn>
                    <TableRowColumn style={{ alignItems: 'center', display: 'flex' }}><FontIcon color={yellow500} className="material-icons" >star</FontIcon>{value.name}</TableRowColumn>
                    <TableRowColumn>-</TableRowColumn>
                    <TableRowColumn>{value.email}</TableRowColumn>
                    <TableRowColumn style={{ alignItems: 'center', display: 'flex', cursor: 'pointer' }} onTouchTap={() => this.props.history.push(`/admin/users/edit/admins/${key}`)}>Editar <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        </Paper>
      </div>
    );
  }
}
