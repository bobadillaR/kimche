import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

export default class Template extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schools: {},
      school: '',
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.on('value', data => this.setState({ support: data.val().support || {}, schools: data.val().schools || {}, loading: false }));
  }

  render() {
    const { loading, support, schools, school } = this.state;
    console.log(support, schools);
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4} >
          <h1>Mensajes de Soporte</h1>
          {loading ?
            <center><CircularProgress size={80} /></center>
            :
            <div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                <SelectField value={school} hintText="Nombre del colegio" floatingLabelText="Colegio" onChange={(event, index, value) => this.setState({ school: value })} fullWidth >
                  {Object.entries(schools).map(([key, value]) => (
                    <MenuItem key={key} value={key} primaryText={value.name} />
                  ))}
                </SelectField>
              </div>
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
                  {Object.entries(support)
                    .filter(([, value]) => {
                      if (school !== '') {
                        return Object.keys(schools[school].admins).filter(admin => admin === value.userId).length > 0 || Object.keys(schools[school].teachers).filter(teacher => teacher === value.userId).length > 0;
                      } else return true;
                    })
                    .map(([key, value]) => (
                      <TableRow key={key}>
                        <TableRowColumn>{moment.unix(value.createDate).format('DD/MM/YY, hh:mm') || ''}</TableRowColumn>
                        <TableRowColumn>{value.name}</TableRowColumn>
                        <TableRowColumn>{value.mail}</TableRowColumn>
                        <TableRowColumn>{value.text}</TableRowColumn>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          }
        </Paper>
      </div>
    );
  }
}
