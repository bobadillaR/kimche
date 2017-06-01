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
      messages: {},
      loading: false,
    };
  }

  componentWillMount() {
    const { database } = this.props;
    database.child('messages').on('value', schools => this.setState({ messages: schools.val() || {} }));
  }

  render() {
    const { messages } = this.state;
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
                <TableHeaderColumn tooltip="Titulo del Aviso">Titulo</TableHeaderColumn>
                <TableHeaderColumn tooltip="Nombre del Aviso">Colegio</TableHeaderColumn>
                <TableHeaderColumn tooltip="Fecha de cuando se creo el aviso">Fecha de Creacion</TableHeaderColumn>
                <TableHeaderColumn tooltip="Fecha de cuando se edito por ultima vez el aviso">Fecha de Edicion</TableHeaderColumn>
                <TableHeaderColumn tooltip="Nombre de usuario y tipo">Usuario</TableHeaderColumn>
                <TableHeaderColumn tooltip="Editar">Editar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover displayRowCheckbox={false}>
              {Object.entries(messages).map(([key, value]) => (
                <TableRow key={key}>
                  <TableRowColumn>{value.title}</TableRowColumn>
                  <TableRowColumn>{value.schoolName}</TableRowColumn>
                  <TableRowColumn>{value.createDate}</TableRowColumn>
                  <TableRowColumn>{value.editDate}</TableRowColumn>
                  <TableRowColumn><FontIcon className="material-icons" >{value.admin ? 'assignment_ind' : 'face'}</FontIcon>{value.userName}</TableRowColumn>
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
