import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import moment from 'moment';

export default class Template extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.on('value', data => this.setState({ support: data.val().support || {}, loading: false }));
  }


  render() {
    const { loading, support } = this.state;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4} >
          <h1>Mensajes de Soporte</h1>
          {loading ?
            <center><CircularProgress size={80} /></center>
            :
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn colSpan="4" tooltip="Tabla de Usuarios" style={{ textAlign: 'center' }}>
                    Tabla de Usuarios
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="Fecha de creacion">Fecha</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Nombre del profesor">Nombre</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Mensaje que envio">Texto</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover displayRowCheckbox={false}>
                {Object.entries(support).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableRowColumn>{moment.unix(value.createDate).format('DD/MM/YY, hh:mm') || ''}</TableRowColumn>
                    <TableRowColumn>{value.name}</TableRowColumn>
                    <TableRowColumn>{value.mail}</TableRowColumn>
                    <TableRowColumn>{value.text}</TableRowColumn>
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
