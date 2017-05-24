import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { lightBlue100, green100, orange100, red100, lime100 } from 'material-ui/styles/colors';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import Message from '../utilities/message';

export default class Aviso extends Component {

  constructor(props) {
    super(props);
    this.state = {
      porque: '',
      que: '',
      loading: false,
      alert: false,
      expand: false,
    };
  }

  componentWillMount() {
    const { message } = this.props;
    this.setState({ que: message.que, porque: message.porque });
  }

  expand(id, message, value) {
    const { database, userData } = this.props;
    const { messagesKey } = this.state;

    if (message.state === 0) database.child('messages').child(messagesKey[id]).update({ state: 1 });
    this.setState({ expand: value });
  }

  render() {
    const { id, message, database, messagesKey } = this.props;
    const { porque, que, loading, expand, alert } = this.state;
    const chooseColor = {
      soporte: lightBlue100,
      felicitar: green100,
      apoyar: orange100,
      corregir: red100,
      conservar: lime100,
    };
    const chooseIcon = {
      corregir: 'warning',
      apoyar: 'add_alert',
      felicitar: 'insert_emoticon',
      soporte: 'info',
      conservar: 'sync',
    };
    console.log(this.props);
    return (
      <Paper style={{ margin: 10 }} onClick={() => !expand && this.expand(id, message, true)}>
        <Card key={id} onExpandChange={value => this.expand(id, message, value)}>
          <CardHeader
            avatar={<FontIcon className="material-icons" style={{fontSize: '42'}} >{chooseIcon[message.tipo]}</FontIcon>}
            style={{ backgroundColor: chooseColor[message.tipo] }}
            title={message.title}
            subtitle={`Fecha de creacion: ${message.createDate}`}
            actAsExpander
            showExpandableButton
          />
          {alert && <Message message={'Se ha completado el aviso'} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
          <Stepper activeStep={message.state} orientation="vertical">
            <Step active={expand && message.state >= 0}>
              <StepLabel>Ver el aviso</StepLabel>
              <StepContent>
                {message.text}
                <br />
                aca va la tabla
              </StepContent>
            </Step>
            <Step active={expand && message.state >= 1}>
              <StepLabel>Porque paso?</StepLabel>
              <StepContent>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                  <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                  <TextField value={porque} floatingLabelFixed hintText="Explicación..." floatingLabelText="Porque paso?" onChange={(event, porqueVal) => this.setState({ porque: porqueVal })} fullWidth />
                </div>
                <CardActions>
                  <RaisedButton primary disabled={loading} label="Enviar" onTouchTap={() => database.child('messages').child(messagesKey).child(que).update({ que, state: 2 })} />
                </CardActions>
              </StepContent>
            </Step>
            <Step active={expand && message.state >= 2}>
              <StepLabel>Que se hizo?</StepLabel>
              <StepContent>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                  <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                  <TextField value={que} floatingLabelFixed hintText="Explicación" floatingLabelText="Que paso?" onChange={(event, queVal) => this.setState({ que: queVal })} fullWidth />
                </div>
                <CardActions>
                  <RaisedButton primary disabled={loading} label="Enviar" onTouchTap={() => { database.child('messages').child(messagesKey).update({ porque, state: 3 }); this.setState({ alert: true }); }} />
                </CardActions>
              </StepContent>
            </Step>
          </Stepper>
        </Card>
      </Paper>
    );
  }
}
