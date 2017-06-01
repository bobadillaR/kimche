import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
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
      messagesKey: [],
      expand: false,
      loading: false,
      alert: false,
      tab: true,
      schools: {},
      update: true,
      admin: false,
      teacherSelecter: '',
      userSelectedMessages: [],
    };
  }

  componentWillMount() {
    const { userData, database } = this.props;
    if (userData !== null && userData.schools !== undefined) {
      const dataMessages = Object.keys(userData.schools[Object.keys(userData.schools)[0]].messages);
      if (Object.values(userData.schools)[0].admin) {
        database.child('schools').child(Object.keys(userData.schools)[0]).on('value', data =>
          this.setState({
            messagesKey: dataMessages,
            admin: true,
            school: Object.keys(userData.schools)[0],
            users: Object.assign({}, data.val().admins, data.val().teachers),
          }),
        );
      } else {
        this.setState({
          messagesKey: dataMessages,
          admin: false,
          school: Object.keys(userData.schools)[0],
        });
      }
    }
  }

  componentWillReceiveProps() {
    const { userData, database } = this.props;
    const { update } = this.state;
    if (update && userData !== null && userData.schools !== undefined) {
      const dataMessages = Object.keys(userData.schools[Object.keys(userData.schools)[0]].messages);
      if (Object.values(userData.schools)[0].admin) {
        database.child('schools').child(Object.keys(userData.schools)[0]).on('value', data =>
          this.setState({
            update: false,
            messagesKey: dataMessages,
            admin: true,
            school: Object.keys(userData.schools)[0],
            users: Object.assign({}, data.val().admins, data.val().teachers),
          }),
        );
      } else {
        this.setState({
          update: false,
          messagesKey: dataMessages,
          admin: false,
          school: Object.keys(userData.schools)[0],
        });
      }
    }
  }

  selectUser(userKey) {
    const { database } = this.props;
    const { school } = this.state;
    this.setState({ loading: true });
    database.child(`users/${userKey}/schools/${school}/messages`).on('value', data =>
      this.setState({ loading: false, userSelectedMessages: Object.keys(data.val()), teacherSelecter: userKey }),
    );
  }

  render() {
    const { loading, tab, messagesKey, teacherSelecter, admin, users, userSelectedMessages } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs style={{ width: '95%', marginTop: '10%' }} onChange={() => this.setState({ tab: !tab })}>
            <Tab
              icon={<FontIcon className="material-icons">chat</FontIcon>}
              label="Mis Avisos"
            />
            {admin &&
              <Tab
                icon={<FontIcon className="material-icons">question_answer</FontIcon>}
                label="Avisos Profesores"
              />
            }
          </Tabs>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper style={{ width: '95%', padding: 10 }}>
            {loading ?
              <center><CircularProgress /></center>
            :
              <div>
                {tab ?
                  <div>
                    <hr />
                    {messagesKey.map(message => <Aviso key={message} messageKey={message} {...this.props} />)}
                    {messagesKey.length === 0 &&
                      <Paper style={{ width: '95%', padding: 10 }}>
                        <h4>No tienes Mensajes Aun</h4>
                      </Paper>
                    }
                  </div>
                  :
                  <div>
                    <hr />
                    <h3>Selecciona un usuario</h3>
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                      <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
                      <SelectField value={teacherSelecter} floatingLabelFixed hintText="Selecciona un profesor" floatingLabelText="Profesor" onChange={(event, textoVal, key) => this.selectUser(key)} fullWidth >
                        {Object.entries(users).map(([id, teacher]) =>
                          <MenuItem key={id} value={id} primaryText={teacher} />,
                        )}
                      </SelectField>
                    </div>
                    {userSelectedMessages.map(message =>
                      <ViewAviso key={message} messageKey={message} {...this.props} />,
                    )}
                    {teacherSelecter !== '' && userSelectedMessages.length === 0 &&
                      <Paper style={{ width: '95%', padding: 10 }}>
                        <h4>No tienes Mensajes Aun</h4>
                      </Paper>
                    }
                  </div>
                }
              </div>
            }
          </Paper>
        </div>
      </div>
    );
  }
}
