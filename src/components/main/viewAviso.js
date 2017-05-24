import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { lightBlue100, green100, orange100, red100, lime100 } from 'material-ui/styles/colors';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import Message from '../utilities/message';

export default class ViewAviso extends Component {

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

  render() {
    const { id, message } = this.props;
    const { porque, que, expand, alert } = this.state;
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
    return (
      <Paper style={{ margin: 10 }} onClick={() => !expand && this.setState({ expand: true })}>
        <Card key={id} onExpandChange={value => this.setState({ expand: value })}>
          <CardHeader
            avatar={<FontIcon className="material-icons" >{chooseIcon[message.tipo]}</FontIcon>}
            style={{ backgroundColor: chooseColor[message.tipo] }}
            title={message.title}
            subtitle={`Fecha de creacion: ${message.createDate}`}
            actAsExpander
            showExpandableButton
          />
          {alert && <Message message={'Se ha completado el aviso'} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
          <Stepper activeStep={message.state} orientation="vertical">
            <Step active={expand}>
              <StepLabel>Ver el aviso</StepLabel>
              <StepContent>
                {message.text}
                <br />
                aca va la tabla
              </StepContent>
            </Step>
            <Step active={expand}>
              <StepLabel>Porque paso?</StepLabel>
              <StepContent>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                  <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                  <TextField disabled value={porque} floatingLabelFixed hintText="Explicación..." floatingLabelText="Porque paso?" fullWidth />
                </div>
              </StepContent>
            </Step>
            <Step active={expand}>
              <StepLabel>Que se hizo?</StepLabel>
              <StepContent>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                  <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                  <TextField disabled value={que} floatingLabelFixed hintText="Explicación" floatingLabelText="Que paso?" fullWidth />
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </Card>
      </Paper>
    );
  }
}
