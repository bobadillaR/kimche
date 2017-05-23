import React, { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: {},
    };
  }

  componentWillReceiveProps() {
    const { database, userData } = this.props;
    if (userData.messages) {
      database.child('messages').on('value', data => this.setState({ messages: Object.entries(userData.messages).map(([messageId]) => data.val()[messageId]) }));
    }
  }

  render() {
    const { messages } = this.state;
    console.log(messages);
    return (
      <div style={{ display: 'flex', marginTop: '10%', justifyContent: 'center' }}>
        {Object.entries(messages).map(([id, message]) =>
          (<Card style={{ height: '50%', width: '75%', padding: 20 }} zDepth={2}>
            <CardHeader
              title="Mensaje"
              subtitle="Estado: visto"
              // avatar="images/jsa-128.jpg"
            />
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>),
        )}
      </div>
    );
  }
}
