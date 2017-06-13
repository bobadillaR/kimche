import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { lightBlue500, green500, orange500, red500, yellow500 } from 'material-ui/styles/colors';
import { Card, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import moment from 'moment';

export default class avisoCreate extends Component {

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

  render() {
    const { message } = this.props;
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
            title={message.title}
            titleColor="white"
            subtitle={`Fecha de creacion: ${moment.unix(message.createDate).format('DD/MM/YY, hh:mm')}`}
            actAsExpander
            showExpandableButton
          />
          <h4>Texto</h4>
          <p>{message.text.split('/n').map(par => <p>{par}</p>)}</p>
          <br />
          <List>
            <Subheader>{message.table && message.tableTitle}</Subheader>
            <Divider />
            {message.table && message.table.filter(a => a !== 'title').map(table =>
              <ListItem primaryText={table.student} rightIcon={<p>{table.data}</p>} />,
            )}
          </List>
        </Card>
      </Paper>
    );
  }
}
