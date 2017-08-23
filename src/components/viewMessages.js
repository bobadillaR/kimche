import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { lime300, lightGreen300, green300, teal300 } from 'material-ui/styles/colors';

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
      colors: [lime300, lightGreen300, green300, teal300],
      tableView: false,
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.on('value', data => this.setState({ messages: data.val().messages || {}, schools: data.val().schools || {}, loading: false }));
  }

  render() {
    const { messages, loading, schools, school, user, colors, tableView } = this.state;
    return (
      <div>
        <Paper style={{ margin: '5%', padding: '3%' }} zDepth={4} >
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <h1>Avisos</h1>
            <div>
              <Link to="/admin/messages/create">
                <RaisedButton primary icon={<FontIcon className="material-icons" >message</FontIcon>} label="Crear Aviso" />
              </Link>
              <RaisedButton style={{ marginLeft: 15 }} onClick={() => this.setState({ tableView: !this.state.tableView })} primary icon={<FontIcon className="material-icons" >list</FontIcon>} label={tableView ? 'Tabla resumida' : 'Tabla completa'} />
            </div>
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
            <div style={{ width: '100%', overflowX: 'scroll' }}>
              {tableView ?
                <table>
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Docente</th>
                      <th>Colegio</th>
                      <th>Tema</th>
                      <th>Tipo</th>
                      <th>Titulo</th>
                      <th>Texto</th>
                      <th>Fecha de Creacion</th>
                      <th>Fecha de Edicion</th>
                      <th>RUT 1</th>
                      <th>Alumno 1</th>
                      <th>Texto 1</th>
                      <th>variable 1</th>
                      <th>variable 2</th>
                      <th>variable 3</th>
                      <th>variable 4</th>
                      <th>variable otro</th>
                      <th>Alumno 2</th>
                      <th>Texto 2</th>
                      <th>variable 1</th>
                      <th>variable 2</th>
                      <th>variable 3</th>
                      <th>variable 4</th>
                      <th>variable otro</th>
                      <th>Alumno 3</th>
                      <th>Texto 3</th>
                      <th>variable 1</th>
                      <th>variable 2</th>
                      <th>variable 3</th>
                      <th>variable 4</th>
                      <th>variable otro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(messages)
                      .filter((data) => { if (school !== '') return data[1].schoolId === school; else return true; })
                      .filter((data) => { if (school !== '') return data[1].schoolId === school; else return true; })
                      .filter((data) => { if (user !== '') return data[1].userId === user; else return true; })
                      .map(([key, value]) => (
                        <tr key={key} >
                          <td>{value.state}</td>
                          <td>{value.userName}</td>
                          <td>{value.schoolName}</td>
                          <td>{value.tema}</td>
                          <td>{value.tipo}</td>
                          <td>{value.title}</td>
                          <td>{value.text}</td>
                          <td>{moment.unix(value.createDate).format('DD/MM/YY')}</td>
                          <td>{moment.unix(value.editDate).format('DD/MM/YY')}</td>
                          {value.table && value.table[0] && value.values && <td>{value.table[0].rut || ''}</td>}
                          {value.table && value.table[0] && value.values && <td>{value.table[0].student || ''}</td>}
                          {value.table && value.table[0] && value.values && <td>{value.table[0].data || ''}</td>}
                          {value.table && value.table[0] && value.values && <td>{value.values[0][0] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[0] && value.values && <td>{value.values[0][1] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[0] && value.values && <td>{value.values[0][2] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[0] && value.values && <td>{value.values[0][3] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[0] && value.values && <td>{value.values[0][4] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[1] && value.values && <td>{value.table[1].rut || ''}</td>}
                          {value.table && value.table[1] && value.values && <td>{value.table[1].student || ''}</td>}
                          {value.table && value.table[1] && value.values && <td>{value.table[1].data || ''}</td>}
                          {value.table && value.table[1] && value.values && <td>{value.values[1][0] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[1] && value.values && <td>{value.values[1][1] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[1] && value.values && <td>{value.values[1][2] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[1] && value.values && <td>{value.values[1][3] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[1] && value.values && <td>{value.values[1][4] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[2] && value.values && <td>{value.table[2].rut || ''}</td>}
                          {value.table && value.table[2] && value.values && <td>{value.table[2].student || ''}</td>}
                          {value.table && value.table[2] && value.values && <td>{value.table[2].data || ''}</td>}
                          {value.table && value.table[2] && value.values && <td>{value.values[2][0] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[2] && value.values && <td>{value.values[2][1] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[2] && value.values && <td>{value.values[2][2] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[2] && value.values && <td>{value.values[2][3] ? 'true' : 'false' || ''}</td>}
                          {value.table && value.table[2] && value.values && <td>{value.values[2][4] ? 'true' : 'false' || ''}</td>}
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
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
                        <TableRow key={key} style={{ backgroundColor: colors[value.state] }}>
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
            </div>
          }
        </Paper>
      </div>
    );
  }
}
