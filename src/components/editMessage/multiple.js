import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import avisoCreate from './avisoCreate';
import Message from '../utilities/message';

export default class Multple extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      validator: [],
      validatorGeneral: true,
      statusIcon: ['report', 'done', 'done_all'],
      alert: false,
      school: '',
      schools: {},
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.on('value', data => this.setState({ schools: data.val().schools, users: data.val().users, loading: false }));
  }

  // create() {
  //   const { data, validator } = this.state;
  //   const { secondaryApp, database } = this.props;
  //   data.forEach((userData, i) => {
  //     secondaryApp.auth().createUserWithEmailAndPassword(userData.Mail, '123456')
  //     .then(user =>
  //       database.child(`'users'}/${user.uid}`).set({
  //         email: userData.Mail,
  //         name: userData.Nombre,
  //         visibility: true,
  //         rut: userData.RUT,
  //         cellphone: userData.Telefono,
  //         admin: false,
  //         createDate: moment().unix(),
  //       }))
  //     .then(() => secondaryApp.auth().currentUser.updateProfile({ displayName: 'normal' }))
  //     .then(() => secondaryApp.auth().signOut())
  //     .then(() => { validator[i] = 2; this.setState({ validator }); if (i === data.length) this.setState({ alert: true }); })
  //     .catch((error) => { validator[i] = 0; this.setState({ error, validator }); });
  //   });
  // }

  chargeData(textValue) {
    const data = JSON.parse(textValue);
    // let validatorGeneral = true;
    // const validator = data.map((element) => {
    //   if (element.userID !== '' && element.title !== '' && element.text !== '' && element.Telefono !== '') return 1;
    //   else { validatorGeneral = false; return 0; }
    // });
    this.setState({ data });
  }

  render() {
    const { validatorGeneral, alert, data, loading } = this.state;
    return (
      loading ? <center style={{ marginTop: '20%' }}><CircularProgress size={120} /></center>
      :
      <Paper style={{ margin: '5%', padding: '3%', marginTop: 0 }} zDepth={4}>
        <TextField fullWidth floatingLabelFixed hintText="Script JSON" floatingLabelText="JSON" onChange={(e, textValue) => this.chargeData(textValue)} />
        {alert && <Message message={'Se han creado todos los usuarios'} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
        {data.length > 0 &&
          data.map(aviso => <avisoCreate message={aviso} />)
        }
        <RaisedButton disabled={validatorGeneral} style={{ float: 'right' }} primary icon={<FontIcon className="material-icons" >person_add</FontIcon>} label="Crear todos los avisos" onTouchTap={() => this.create()} />
      </Paper>
    );
  }
}
