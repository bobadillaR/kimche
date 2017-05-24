import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Aviso from './aviso';
import ViewAviso from './viewAviso';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      expand: false,
      loading: false,
      alert: false,
      tab: true,
      schools: {},
      schoolsList: {},
      schoolMessages: {},
    };
  }

  componentWillReceiveProps() {
    const { database, userData } = this.props;
    if (userData.admins !== undefined) {
      this.setState({ loading: true });
      database.child('schools').on('value', data =>
        this.setState({
          schools: Object.entries(userData.admins).map(([schoolId]) => data.val()[schoolId]),
          schoolsKey: Object.entries(userData.admins).map(([schoolId]) => schoolId),
          loading: false,
        }),
      );
    }
    if (userData.messages !== undefined) {
      this.setState({ loading: true });
      database.child('messages').on('value', data =>
        this.setState({
          messages: Object.entries(userData.messages).map(([messageId]) => data.val()[messageId]),
          messagesKey: Object.entries(userData.messages).map(([messageId]) => messageId),
          loading: false,
        }),
      );
    }
  }

  selectSchool(key, school) {
    const { database } = this.props;
    const { schools } = this.state;
    this.setState({ schoolSelected: key });
    this.setState({ loading: true });
    database.child('messages').on('value', data =>
      this.setState({
        schoolMessages: Object.entries(schools[school].messages).map(([messageId]) => data.val()[messageId]),
        schoolMessagesKey: Object.entries(schools[school].messages).map(([messageId]) => messageId),
        loading: false,
      }),
    );
  }

  render() {
    const { database } = this.props;
    const { messages, messagesKey, loading, tab, schools, schoolsKey, schoolSelected, schoolMessages, schoolMessagesKey } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs style={{ width: '95%', marginTop: '10%' }} onChange={() => this.setState({ tab: !tab })}>
            <Tab
              icon={<FontIcon className="material-icons">chat</FontIcon>}
              label="Mis Avisos"
            />
            <Tab
              icon={<FontIcon className="material-icons">question_answer</FontIcon>}
              label="Avisos Profesores"
            />
          </Tabs>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper style={{ width: '95%', padding: 10 }}>
            <div>
              {loading && <center><CircularProgress /></center>}
              {tab ?
                <div>
                  <center><h2>Mis Avisos</h2></center>
                  <hr />
                  {Object.entries(messages).map(([id, message]) => <Aviso message={message} id={id} messagesKey={messagesKey[id]} {...this.props} />)}
                </div>
                :
                <div>
                  <center><h2>Avisos Profesores</h2></center>
                  <hr />
                  <SelectField value={schoolSelected} hintText="Selecciona un colegio" floatingLabelText="Colegio" onChange={(event, textoVal, key) => this.selectSchool(key, textoVal)} fullWidth >
                    {Object.entries(schools).map(([key, school]) =>
                      <MenuItem key={school.nombre} value={schoolsKey[key]} primaryText={school.nombre} />,
                    )}
                  </SelectField>
                  {Object.entries(schoolMessages).map(([id, message]) => <ViewAviso message={message} id={id} database={database} messagesKey={schoolMessagesKey[id]} />)}
                </div>
              }
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
