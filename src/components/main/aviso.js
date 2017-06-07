import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { lightBlue500, green500, orange500, red500, yellow500 } from 'material-ui/styles/colors';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

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
      message: {},
      state: 0,
    };
  }

  componentWillMount() {
    const { messageKey, database } = this.props;
    this.setState({ loading: true });
    database.child('messages').child(messageKey).on('value', data =>
      this.setState({ message: data.val(), state: data.val().state, porque: data.val().porque || '', que: data.val().que || '', loading: false }),
    );
  }

  expand(id, message, value) {
    const { database, messageKey } = this.props;
    if (message.state === 0) {
      database.child('messages').child(messageKey).update({ state: 1 });
    }
    this.setState({ expand: value });
  }

  render() {
    const { id, database, messageKey } = this.props;
    const { porque, que, loading, expand, alert, state, message } = this.state;
    const chooseColor = {
      soporte: lightBlue500,
      felicitar: green500,
      apoyar: orange500,
      corregir: red500,
      conservar: yellow500,
    };
    const chooseIcon = {
      corregir: 'warning',
      apoyar: 'add_alert',
      felicitar: 'thumb_up',
      soporte: 'info',
      conservar: 'sync',
    };
    return (
      <Paper style={{ margin: 10 }}>
        {loading ? <center><CircularProgress size={80} /></center>
        :
        <Card key={id} onExpandChange={value => this.expand(id, message, value)}>
          <CardHeader
            avatar={<FontIcon color="white" className="material-icons" style={{ fontSize: 42 }} >{chooseIcon[message.tipo]}</FontIcon>}
            style={{ backgroundColor: chooseColor[message.tipo] }}
            title={message.title}
            titleColor="white"
            subtitle={`Fecha de creacion: ${message.createDate}`}
            actAsExpander
            showExpandableButton
          />
          {message.tipo !== 'soporte' ?
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
                        database.child('messages').child(messageKey).update({ porque, state: state > 2 ? 3 : 2 });
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
                        database.child('messages').child(messageKey).update({ que, state: 3 });
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
          }
        </Card>
        }
      </Paper>
    );
  }
}
