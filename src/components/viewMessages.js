import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class ViewMessages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      schools: {},
      loading: true,
      school: '',
      user: '',
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.on('value', data => this.setState({ messages: data.val().messages || {}, schools: data.val().schools || {}, loading: false }));
  }

  render() {
    const { messages, loading, schools, school, user } = this.state;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4} >
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>Avisos</h1>
            <Link to="/admin/messages/create">
              <RaisedButton primary icon={<FontIcon className="material-icons" >message</FontIcon>} label="Crear Aviso" />
            </Link>
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
            <SelectField value={school} hintText="Nombre del colegio" floatingLabelText="Colegio" onChange={(event, index, value) => this.setState({ school: value, user: '' })} fullWidth >
              {Object.entries(schools).map(([key, value]) => (
                <MenuItem key={key} value={key} primaryText={value.name} />
              ))}
            </SelectField>
          </div>
          {school !== '' &&
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
              <SelectField value={user} hintText="Nombre del usuario" floatingLabelText="Usuario" onChange={(event, index, value) => this.setState({ user: value })} fullWidth >
                {Object.entries(schools[school].admins).map(([key, value]) => (
                  <MenuItem key={key} value={key} primaryText={value} />
                ))}
                {Object.entries(schools[school].teachers).map(([key, value]) => (
                  <MenuItem key={key} value={key} primaryText={value} />
                ))}
              </SelectField>
            </div>
          }
          {loading ?
            <center><CircularProgress size={80} /></center>
            :
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn colSpan="6" tooltip="Tabla de Usuarios" style={{ textAlign: 'center' }}>
                    Tabla de Avisos
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="Titulo del Aviso">Titulo</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Nombre del Aviso">Colegio</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Fecha de cuando se creo el aviso">Fecha de Creacion</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Fecha de cuando se edito por ultima vez el aviso">Fecha de Edicion</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Nombre de usuario y tipo">Usuario</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Editar">Editar</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover displayRowCheckbox={false}>
                {Object.entries(messages)
                  .filter((data) => { if (school !== '') return data[1].schoolId === school; else return true; })
                  .filter((data) => { if (school !== '') return data[1].schoolId === school; else return true; })
                  .filter((data) => { if (user !== '') return data[1].userId === user; else return true; })
                  .map(([key, value]) => (
                    <TableRow key={key}>
                      <TableRowColumn>({value.state}) - {value.title}</TableRowColumn>
                      <TableRowColumn>{value.schoolName}</TableRowColumn>
                      <TableRowColumn>{moment.unix(value.createDate).format('DD/MM/YY')}</TableRowColumn>
                      <TableRowColumn>{moment.unix(value.editDate).format('DD/MM/YY')}</TableRowColumn>
                      <TableRowColumn><FontIcon className="material-icons" >{value.admin ? 'assignment_ind' : 'face'}</FontIcon>{value.userName}</TableRowColumn>
                      <TableRowColumn style={{ cursor: 'pointer', alignItems: 'center', display: 'flex' }} onTouchTap={() => this.props.history.push(`/admin/messages/edit/${key}`)}>Ver <FontIcon className="material-icons" >edit</FontIcon></TableRowColumn>
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
