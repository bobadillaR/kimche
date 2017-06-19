import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { lightBlue500, green500, orange500, red500, yellow500 } from 'material-ui/styles/colors';
import { Card, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import moment from 'moment';

export default class AvisoCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: {},
    };
  }

  render() {
    const { message, users, schools, validator } = this.props;
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
        <Card>
          <CardHeader
            avatar={<FontIcon color="white" className="material-icons" style={{ fontSize: 42 }} >{chooseIcon[message.tipo]}</FontIcon>}
            style={{ backgroundColor: chooseColor[message.tipo] }}
            title={`Usuario: ${users[message.userId].name}, Colegio: ${schools[message.schoolId].name}`}
            titleColor="white"
            subtitle={`Fecha de creacion: ${moment().format('DD/MM/YY, hh:mm')}`}
          />
          <div style={{ marginLeft: 10 }}>
            <h3 style={{ marginTop: 10 }}>{message.title}</h3>
            <Subheader>{validator ? 'Aprobado' : 'Rechazado'}</Subheader>
            <p>{message.text.split('/n').map(par => <p key={par}>{par}</p>)}</p>
            <br />
            <List>
              <Subheader>{message.table && message.tableTitle}</Subheader>
              <Divider />
              <List>
                <Subheader>{message.tableTitle}</Subheader>
                <Divider />
                <ListItem primaryText={message.student1} rightIcon={<p>{message.data1}</p>} />
                <ListItem primaryText={message.student2} rightIcon={<p>{message.data2}</p>} />
                <ListItem primaryText={message.student3} rightIcon={<p>{message.data3}</p>} />
              </List>
            </List>
          </div>
        </Card>
      </Paper>
    );
  }
}
