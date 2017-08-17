import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { yellow500 } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// TODO: add loading
// TODO: add schools

export default class ViewUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: {},
      schools: {},
      loading: true,
      school: '',
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.on('value', data => this.setState({ admins: data.val().admins || {}, users: data.val().users || {}, loading: false, schools: data.val().schools }));
  }

  render() {
    const { loading, admins, users, schools, school } = this.state;
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
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
            <SelectField value={school} hintText="Nombre del colegio" floatingLabelText="Colegio" onChange={(event, index, value) => this.setState({ school: value })} fullWidth >
              {Object.entries(schools).map(([key, value]) => (
                <MenuItem key={key} value={key} primaryText={value.name} />
              ))}
            </SelectField>
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
                {Object.entries(users).filter((user) => { if (school === '') return true; else return Object.keys(user[1].schools).indexOf(school) >= 0; }).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableRowColumn>{key}</TableRowColumn>
                    <TableRowColumn>{value.name}</TableRowColumn>
                    <TableRowColumn>{value.schools !== undefined && Object.values(value.schools).map(schoolValue => <p key={schoolValue.name}>{schoolValue.name}</p>)}</TableRowColumn>
                    <TableRowColumn>{value.email}</TableRowColumn>
                    <TableRowColumn style={{ alignItems: 'center' }} onTouchTap={() => this.props.history.push(`/admin/users/edit/users/${key}`)}>Editar <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
                  </TableRow>
                ))}
                {Object.entries(admins).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableRowColumn>{key}</TableRowColumn>
                    <TableRowColumn style={{ alignItems: 'center', display: 'flex' }}><FontIcon color={yellow500} className="material-icons" >star</FontIcon>{value.name}</TableRowColumn>
                    <TableRowColumn>-</TableRowColumn>
                    <TableRowColumn>{value.email}</TableRowColumn>
                    <TableRowColumn style={{ alignItems: 'center' }} onTouchTap={() => this.props.history.push(`/admin/users/edit/admins/${key}`)}>Editar <FontIcon className="material-icons" style={{ cursor: 'pointer' }} >edit</FontIcon></TableRowColumn>
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
