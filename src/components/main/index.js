import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

import Aviso from './aviso';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      expand: false,
      loading: true,
      alert: false,
    };
  }

  componentWillReceiveProps() {
    const { database, userData } = this.props;
    if (userData.messages) {
      database.child('messages').on('value', data => this.setState({ messages: Object.entries(userData.messages).map(([messageId]) => data.val()[messageId]), messagesKey: Object.entries(userData.messages).map(([messageId]) => messageId), loading: false }));
    }
  }

  render() {
    const { database } = this.props;
    const { messages, messagesKey, loading } = this.state;
    return (
      <div style={{ display: 'flex', marginTop: '10%', justifyContent: 'center' }}>
        <Paper style={{ width: '95%', padding: 10 }}>
          <div>
            <h2>Tus Avisos</h2>
            <hr />
            {loading && <center><CircularProgress /></center>}
            {Object.entries(messages).map(([id, message]) => <Aviso message={message} id={id} database={database} messagesKey={messagesKey[id]} />)}
          </div>
        </Paper>
      </div>
    );
  }
}
