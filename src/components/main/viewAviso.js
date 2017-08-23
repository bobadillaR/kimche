import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { lightBlue500, green500, orange500, red500, yellow500 } from 'material-ui/styles/colors';
import { Card, CardHeader } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import moment from 'moment';

export default class ViewAviso extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      expand: false,
      checkBox: [
        [false, false, false, false, ''],
        [false, false, false, false, ''],
        [false, false, false, false, ''],
      ],
      active: false,
    };
  }

  componentWillMount() {
    const { messageKey, database } = this.props;
    this.setState({ loading: true });
    database.child('messages').child(messageKey).on('value', data =>
      this.setState({ message: data.val(), loading: false, checkBox: data.val().values || this.state.checkBox }),
    );
  }

  render() {
    const { active, message, loading, checkBox } = this.state;
    const chooseColor = {
      soporte: lightBlue500,
      felicitar: green500,
      apoyar: orange500,
      corregir: red500,
      conservar: yellow500,
      Soporte: lightBlue500,
      Felicitar: green500,
      Apoyar: orange500,
      Corregir: red500,
      Conservar: yellow500,
    };
    const chooseIcon = {
      corregir: 'warning',
      apoyar: 'add_alert',
      felicitar: 'thumb_up',
      soporte: 'info',
      conservar: 'sync',
      Corregir: 'warning',
      Apoyar: 'add_alert',
      Felicitar: 'thumb_up',
      Soporte: 'info',
      Conservar: 'sync',
    };
    const actions = [
      <RaisedButton
        label="Enviar"
        primary
        onTouchTap={() => this.send()}
      />,
    ];
    return (
      <div style={{ marginTop: 15 }}>
        {loading ?
          <center><CircularProgress size={80} /></center>
        :
          <Card onTouchTap={() => this.setState({ active: true })}>
            <CardHeader
              avatar={<FontIcon color="white" className="material-icons" >{chooseIcon[message.tipo]}</FontIcon>}
              style={{ backgroundColor: chooseColor[message.tipo] }}
              title={message.title}
              titleColor="white"
              subtitle={`Fecha de creacion: ${moment.unix(message.createDate).format('DD/MM/YY, hh:mm')}`}
            />
          </Card>
        }
        {!loading &&
          <Dialog open={active} actions={actions} autoScrollBodyContent onRequestClose={() => this.setState({ active: false, activeText: [false, false, false] })} title={<p style={{ fontSize: 16, fontWeight: 400 }}>{message.text}</p>}>
            {message.table && message.table.filter(a => a !== 'title' && a !== false).map((table, index) => {
              if (message.tema === 'Asistencia' || message.tema === 'asistencia') {
                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p>{message.table[index].student}</p>
                      <small>Asistencia: {message.table[index].data}</small>
                    </div>
                    <Checkbox disabled checked={checkBox[index][0]} label="Problemas Familiares" onCheck={(event, value) => { checkBox[index][0] = value; this.setState({ checkBox }); }} />
                    <Checkbox disabled checked={checkBox[index][1]} label="Responsabilidad" onCheck={(event, value) => { checkBox[index][1] = value; this.setState({ checkBox }); }} />
                    <Checkbox disabled checked={checkBox[index][2]} label="Estado de salud" onCheck={(event, value) => { checkBox[index][2] = value; this.setState({ checkBox }); }} />
                    <Checkbox disabled checked={checkBox[index][3]} label="Otro" onCheck={(event, value) => { checkBox[index][3] = value; this.setState({ checkBox }); }} />
                    {checkBox[index][3] && <TextField disabled value={checkBox[index][4]} hintText="Otro motivo" floatingLabelText="Explicación" floatingLabelFixed fullWidth onChange={(event, value) => { checkBox[index][4] = value; this.setState({ checkBox }); }} />}
                  </div>
                );
              } else {
                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p>{message.table[index].student}</p>
                      <small>Nota: {message.table[index].data}</small>
                    </div>
                    <Checkbox disabled checked={checkBox[index][0]} label="Desmotivación" onCheck={(event, value) => { checkBox[index][0] = value; this.setState({ checkBox }); }} />
                    <Checkbox disabled checked={checkBox[index][1]} label="Responsabilidad" onCheck={(event, value) => { checkBox[index][1] = value; this.setState({ checkBox }); }} />
                    <Checkbox disabled checked={checkBox[index][2]} label="Compromiso de la familia" onCheck={(event, value) => { checkBox[index][2] = value; this.setState({ checkBox }); }} />
                    <Checkbox disabled checked={checkBox[index][3]} label="Otro" onCheck={(event, value) => { checkBox[index][3] = value; this.setState({ checkBox }); }} />
                    {checkBox[index][3] && <TextField disabled value={checkBox[index][4]} hintText="Otro motivo" floatingLabelText="Explicación" floatingLabelFixed fullWidth onChange={(event, value) => { checkBox[index][4] = value; this.setState({ checkBox }); }} />}
                  </div>
                );
              }
            })}
          </Dialog>
        }
      </div>
    );
  }
}
