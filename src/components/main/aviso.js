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

// import Message from '../utilities/message';

export default class Aviso extends Component {

  constructor(props) {
    super(props);
    this.state = {
      que: false,
      loading: false,
      alert: false,
      message: {},
      state: 0,
      active: false,
      activeText: [false, false, false],
      checkBox: [
        [false, false, false, false, ''],
        [false, false, false, false, ''],
        [false, false, false, false, ''],
      ],
    };
  }

  componentWillMount() {
    const { messageKey, database } = this.props;
    this.setState({ loading: true });
    database.child('messages').child(messageKey).on('value', data =>
      this.setState({ message: data.val(), state: data.val().state, checkBox: data.val().values || [[false, false, false, false, ''], [false, false, false, false, ''], [false, false, false, false, '']], loading: false }),
    );
  }

  send() {
    const { database, messageKey } = this.props;
    const { checkBox } = this.state;
    database.child('messages').child(messageKey).update({ state: 2, values: checkBox, editDate: moment().unix() });
    this.setState({ active: !this.state.active });
  }

  render() {
    const { id, database, messageKey } = this.props;
    const { loading, message, active, checkBox } = this.state;
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
    console.log(message);
    return (
      <div style={{ marginTop: 10 }}>
        {loading ? <center><CircularProgress size={80} /></center>
        :
        <Card
          key={id}
          onClick={() => {
            database.child('messages').child(messageKey).update({ state: message.state > 1 ? 2 : 1, editDate: moment().unix() });
            this.setState({ active: true });
          }}
          style={{ cursor: 'pointer' }}
        >
          <CardHeader
            avatar={<FontIcon color="white" className="material-icons" style={{ fontSize: 42 }} >{chooseIcon[message.tipo]}</FontIcon>}
            style={{ backgroundColor: chooseColor[message.tipo] }}
            title={message.title}
            titleColor="white"
            subtitle={`Fecha de creacion: ${moment.unix(message.createDate).format('DD/MM/YY, hh:mm')}`}
          />
        </Card>}
        <Dialog open={active} actions={actions} autoScrollBodyContent onRequestClose={() => this.setState({ active: false, activeText: [false, false, false] })} title={message.text}>
          {message.table && message.table.filter(a => a !== 'title').map((table, index) => {
            if (message.tipo === 'apoyar' || message.tipo === 'Apoyar' || message.tipo === 'corregir' || message.tipo === 'Corregir') {
              if (message.tema === 'Asistencia') {
                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p>{table.student}</p>
                      <small>Asistencia: {table.data}</small>
                    </div>
                    <Checkbox checked={checkBox[index][0]} label="Problemas Familiares" onCheck={(event, value) => { checkBox[index][0] = value; this.setState({ checkBox }); }} />
                    <Checkbox checked={checkBox[index][1]} label="Responsabilidad" onCheck={(event, value) => { checkBox[index][1] = value; this.setState({ checkBox }); }} />
                    <Checkbox checked={checkBox[index][2]} label="Estado de salud" onCheck={(event, value) => { checkBox[index][2] = value; this.setState({ checkBox }); }} />
                    <Checkbox checked={checkBox[index][3]} label="Otro" onCheck={(event, value) => { checkBox[index][3] = value; this.setState({ checkBox }); }} />
                    {checkBox[index][3] && <TextField value={checkBox[index][4]} hintText="Otro motivo" floatingLabelText="Explicación" floatingLabelFixed fullWidth onChange={(event, value) => { checkBox[index][4] = value; this.setState({ checkBox }); }} />}
                  </div>
                );
              } else {
                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p>{table.student}</p>
                      <small>Nota: {table.data}</small>
                    </div>
                    <Checkbox checked={checkBox[index][0]} label="Desmotivación" onCheck={(event, value) => { checkBox[index][0] = value; this.setState({ checkBox }); }} />
                    <Checkbox checked={checkBox[index][1]} label="Responsabilidad" onCheck={(event, value) => { checkBox[index][1] = value; this.setState({ checkBox }); }} />
                    <Checkbox checked={checkBox[index][2]} label="Compromiso de la familia" onCheck={(event, value) => { checkBox[index][2] = value; this.setState({ checkBox }); }} />
                    <Checkbox checked={checkBox[index][3]} label="Otro" onCheck={(event, value) => { checkBox[index][3] = value; this.setState({ checkBox }); }} />
                    {checkBox[index][3] && <TextField value={checkBox[index][4]} hintText="Otro motivo" floatingLabelText="Explicación" floatingLabelFixed fullWidth onChange={(event, value) => { checkBox[index][4] = value; this.setState({ checkBox }); }} />}
                  </div>
                );
              }
            } else return null;
          })}
        </Dialog>
        {/* {message.tipo !== 'soporte' ?
          <Stepper activeStep={state} orientation="vertical">
            <Step active={expand && state >= 0}>
              <StepLabel>Ver el aviso</StepLabel>
              <StepContent>
                {message.text.split('/n').map(par => <p>{par}</p>)}
                <br />
                <List>
                  <Subheader>{message.table && message.tableTitle}</Subheader>
                  <Divider />
                  {message.table && message.table.filter(a => a !== 'title').map(table =>
                    <ListItem primaryText={table.student} rightIcon={<p>{table.data}</p>} />,
                  )}
                </List>
              </StepContent>
            </Step>
            <Step active={expand && state >= 1}>
              <StepLabel>¿Por qué pasó?</StepLabel>
              <StepContent>
                <div>
                  {alert === 2 && <Message message={'Se han guardado los cambios'} style={{ margin: 5 }} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                    <TextField value={porque} floatingLabelFixed hintText="Explicación..." floatingLabelText="Porque paso?" onChange={(event, porqueVal) => this.setState({ porque: porqueVal })} fullWidth />
                  </div>
                </div>
                <CardActions>
                  <RaisedButton
                    primary
                    disabled={loading}
                    label="Enviar"
                    onTouchTap={() => {
                      database.child('messages').child(messageKey).update({ porque, state: state > 2 ? 3 : 2, editDate: moment().unix() });
                      this.setState({ alert: 2 });
                    }}
                  />
                </CardActions>
              </StepContent>
            </Step>
            <Step active={expand && state >= 2}>
              <StepLabel>¿Qué se hizo?</StepLabel>
              <StepContent>
                <div>
                  {alert === 3 && <Message message={'Se ha completado el aviso'} style={{ margin: 5 }} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                    <TextField value={que} floatingLabelFixed hintText="Explicación" floatingLabelText="Que paso?" onChange={(event, queVal) => this.setState({ que: queVal })} fullWidth />
                  </div>
                </div>
                <CardActions>
                  <RaisedButton
                    primary
                    disabled={loading}
                    label="Enviar"
                    onTouchTap={() => {
                      database.child('messages').child(messageKey).update({ que, state: 3, editDate: moment().unix() });
                      this.setState({ alert: 3 });
                    }}
                  />
                </CardActions>
              </StepContent>
            </Step>
          </Stepper>
          :
          <Stepper orientation="vertical">
            <Step active={expand}>
              <StepLabel>Ver el aviso</StepLabel>
              <StepContent>
                {message.text.split('/n').map(par => <p>{par}</p>)}
                <br />
                <List>
                  <Subheader>{message.table && message.tableTitle}</Subheader>
                  <Divider />
                  {message.table && message.table.filter(a => a !== 'title').map(table =>
                    <ListItem key={table.student} primaryText={table.student} rightIcon={<p>{table.data}</p>} />,
                  )}
                </List>
              </StepContent>
            </Step>
          </Stepper>
        } */}
      </div>
    );
  }
}
