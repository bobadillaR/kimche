import React, { Component } from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Redirect } from 'react-router-dom';
import Aviso from './aviso';
import ViewAviso from './viewAviso';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messagesKey: [],
      expand: false,
      loading: true,
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
      this.setState({ loading: true });
      const dataMessages = userData.schools[Object.keys(userData.schools)[0]].messages !== undefined ? Object.keys(userData.schools[Object.keys(userData.schools)[0]].messages) : [];
      if (Object.values(userData.schools)[0].admin) {
        database.child('schools').child(Object.keys(userData.schools)[0]).on('value', data =>
          this.setState({
            messagesKey: dataMessages,
            admin: true,
            school: Object.keys(userData.schools)[0],
            users: Object.assign({}, data.val().admins, data.val().teachers),
            loading: false,
          }),
        );
      } else {
        this.setState({
          messagesKey: dataMessages,
          admin: false,
          school: Object.keys(userData.schools)[0],
          loading: false,
        });
      }
    }
    this.setState({ loading: false });
  }

  componentWillReceiveProps() {
    const { userData, database } = this.props;
    const { update } = this.state;
    if (update && userData !== null && userData.schools !== undefined) {
      this.setState({ loading: true });
      let dataMessages = [];
      if (userData.schools[Object.keys(userData.schools)[0]].messages !== undefined) dataMessages = userData.schools[Object.keys(userData.schools)[0]].messages;
      dataMessages = Object.keys(dataMessages).sort().reverse();
      if (Object.values(userData.schools)[0].admin) {
        database.child('schools').child(Object.keys(userData.schools)[0]).on('value', data =>
          this.setState({
            update: false,
            messagesKey: dataMessages,
            admin: true,
            school: Object.keys(userData.schools)[0],
            users: Object.assign({}, data.val().admins, data.val().teachers),
            loading: false,
          }),
        );
      } else {
        this.setState({
          update: false,
          messagesKey: dataMessages,
          admin: false,
          school: Object.keys(userData.schools)[0],
          loading: false,
        });
      }
    }
    this.setState({ loading: false });
    // this.orderMessages();
  }

  // orderMessages() {
  //   const { database } = this.props;
  //   database.child('messages').on('value', (data) => {
  //     const update = {};
  //     data.forEach((messageId) => {
  //       if (messageId.val().table !== undefined) update[`messages/${messageId.key}/table/title`] = null;
  //       if (messageId.val().table !== undefined) update[`messages/${messageId.key}/tableTitle`] = 'Tabla de datos';
  //     });
  //     console.log(update);
  //     database.update(update);
  //   });
  // database.child('users').on('value', (data) => {
  //   const update = {};
  //   data.forEach((messageId) => {
  //     update[`users/${messageId.key}/createDate`] = moment().unix();
  //   });
  //   database.update(update);
  // });
  // database.child('schools').on('value', (data) => {
  //   const update = {};
  //   data.forEach((messageId) => {
  //     update[`schools/${messageId.key}/createDate`] = moment().unix();
  //   });
  //   database.update(update);
  // });
  // }

  selectUser(userKey) {
    const { database } = this.props;
    const { school } = this.state;
    this.setState({ loading: true });
    database.child(`users/${userKey}/schools/${school}`).on('value', data =>
      this.setState({ loading: false, userSelectedMessages: data.val().messages !== undefined ? Object.keys(data.val().messages).sort().reverse() : [], teacherSelecter: userKey }),
    );
  }

  render() {
    const { loading, tab, messagesKey, teacherSelecter, admin, users, userSelectedMessages } = this.state;
    console.log(userSelectedMessages);
    const { user } = this.props;
    if (!loading && !user) return <Redirect to={'/login'} />;
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
                    {messagesKey.length < 1 &&
                      <Paper style={{ width: '95%', padding: 10 }}>
                        <h4>No tienes Mensajes Aun</h4>
                      </Paper>
                    }
                  </div>
                  :
                  <div>
                    <hr />
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                      <FontIcon style={{ marginRight: '2%' }} className="material-icons" >face</FontIcon>
                      <SelectField value={teacherSelecter} floatingLabelFixed hintText="Selecciona un profesor" floatingLabelText="Profesor" onChange={(event, textoVal, key) => this.selectUser(key)} fullWidth >
                        {Object.entries(users).filter(([id]) => id !== user.uid).map(([id, teacher]) =>
                          <MenuItem key={id} value={id} primaryText={teacher} />,
                        )}
                      </SelectField>
                    </div>
                    {teacherSelecter !== '' && userSelectedMessages.length === 0 ?
                      <Paper style={{ width: '95%', padding: 10, margin: 10 }}>
                        <h4>Este Usuario no tiene Mensajes</h4>
                      </Paper>
                      :
                      userSelectedMessages.map(message =>
                        <ViewAviso key={message} messageKey={message} {...this.props} />,
                      )
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
