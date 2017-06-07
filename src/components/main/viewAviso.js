import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { lightBlue500, green500, orange500, red500, yellow500 } from 'material-ui/styles/colors';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import Message from '../utilities/message';

export default class ViewAviso extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      alert: false,
      expand: false,
    };
  }

  componentWillMount() {
    const { messageKey, database } = this.props;
    this.setState({ loading: true });
    database.child('messages').child(messageKey).on('value', data =>
      this.setState({ message: data.val(), loading: false }),
    );
  }

  render() {
    const { expand, alert, message, loading } = this.state;
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
        {loading ?
          <center><CircularProgress size={80} /></center>
        :
          <Card onExpandChange={value => this.setState({ expand: value })}>
            <CardHeader
              avatar={<FontIcon color="white" className="material-icons" >{chooseIcon[message.tipo]}</FontIcon>}
              style={{ backgroundColor: chooseColor[message.tipo] }}
              title={message.title}
              titleColor="white"
              subtitle={`Fecha de creacion: ${message.createDate}`}
              actAsExpander
              showExpandableButton
            />
            {alert && <Message message={'Se ha completado el aviso'} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
            {message.tipo !== 'soporte' ?
              <Stepper activeStep={message.state} orientation="vertical">
                <Step active={expand && message.state >= 0}>
                  <StepLabel>Ver el aviso</StepLabel>
                  <StepContent>
                    {message.text.split('/n').map(par => <p key={par}>{par}</p>)}
                    <br />
                    <List>
                      <Subheader>{message.table && message.tableTitle}</Subheader>
                      <Divider />
                      {message.table && message.table.map(table =>
                        <ListItem primaryText={table.student} rightIcon={<p>{table.data}</p>} />,
                      )}
                    </List>
                  </StepContent>
                </Step>
                <Step active={expand && message.state >= 1}>
                  <StepLabel>¿Por qué pasó?</StepLabel>
                  <StepContent>
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                      <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                      <p>{message.porque || 'Aun no se ha contestado'}</p>
                    </div>
                  </StepContent>
                </Step>
                <Step active={expand && message.state >= 2}>
                  <StepLabel>¿Qué se hizo?</StepLabel>
                  <StepContent>
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                      <FontIcon style={{ marginRight: '2%' }} className="material-icons" >school</FontIcon>
                      <p>{message.que || 'Aun no se ha contestado'}</p>
                    </div>
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
                      {message.table && message.table.map(table =>
                        <ListItem primaryText={table.student} rightIcon={<p>{table.data}</p>} />,
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
