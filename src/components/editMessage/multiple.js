import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';

// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import AvisoCreate from './avisoCreate';
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
      charged: false,
    };
  }

  componentWillMount() {
    const { database } = this.props;
    this.setState({ loading: true });
    database.on('value', data => this.setState({ schools: data.val().schools, users: data.val().users, loading: false }));
  }

  create() {
    const { data, schools, users } = this.state;
    const { database } = this.props;
    const update = {};
    this.setState({ loading: true });
    data.forEach((dataVal) => {
      const messageKey = database.child('school').push().key;
      const table = [
        dataVal.data1 !== undefined && { data: dataVal.data1, student: dataVal.student1, rut: dataVal.rut1 },
        dataVal.data2 !== undefined && { data: dataVal.data2, student: dataVal.student2, rut: dataVal.rut2 },
        dataVal.data3 !== undefined && { data: dataVal.data3, student: dataVal.student3, rut: dataVal.rut3 },
      ];
      update[`messages/${messageKey}/title`] = dataVal.title;
      update[`messages/${messageKey}/text`] = dataVal.text;
      update[`messages/${messageKey}/tipo`] = dataVal.tipo;
      update[`messages/${messageKey}/rut`] = dataVal.rut;
      update[`messages/${messageKey}/state`] = 0;
      update[`messages/${messageKey}/table`] = table || null;
      update[`messages/${messageKey}/tema`] = dataVal.tema || null;
      update[`messages/${messageKey}/admin`] = dataVal.admin === 1;
      update[`messages/${messageKey}/visibility`] = true;
      update[`messages/${messageKey}/createDate`] = moment().unix();
      update[`messages/${messageKey}/editDate`] = moment().unix();
      update[`schools/${dataVal.schoolId}/messages/${messageKey}`] = moment().unix();
      update[`users/${dataVal.userId}/schools/${dataVal.schoolId}/messages/${messageKey}`] = moment().unix();
      update[`messages/${messageKey}/schoolId`] = dataVal.schoolId;
      update[`messages/${messageKey}/schoolName`] = schools[dataVal.schoolId].name;
      update[`messages/${messageKey}/userId`] = dataVal.userId;
      update[`messages/${messageKey}/userName`] = users[dataVal.userId].name;
    });
    database.update(update)
    .then(this.setState({ loading: false, alert: true, data: {} }));
  }

  chargeData(textValue) {
    if (textValue[0] === '[') {
      const data = JSON.parse(textValue);
      let validatorGeneral = true;
      const validator = data.map((element) => {
        if (element.userId !== '' && element.schoolId !== '' && element.tipo !== '' && element.rut !== '') return 1;
        else { validatorGeneral = false; return 0; }
      });
      this.setState({ data, validator, validatorGeneral, charged: 0 });
    } else this.setState({ data: false });
  }

  render() {
    const { validatorGeneral, alert, data, loading, validator } = this.state;
    let { charged } = this.state;
    return (
      loading ? <center style={{ marginTop: '20%' }}><CircularProgress size={120} /></center>
      :
      <Paper style={{ margin: '5%', padding: '3%', marginTop: 0 }} zDepth={4}>
        <TextField fullWidth floatingLabelFixed hintText="Script JSON" floatingLabelText="JSON" onChange={(e, textValue) => this.chargeData(textValue)} />
        {alert && <Message message={'Se han creado todos los mensajes'} tipo="success" time={4000} onClose={() => this.setState({ alert: false })} />}
        {charged && charged < data.length && <h3>Se han cargado {charged}/{data.length}</h3>}
        {data && data !== '' && data.length > 0 &&
          data.map((aviso, key) => {
            charged += 1;
            return (<AvisoCreate key={aviso.userID} message={aviso} {...this.state} validator={validator[key]} index={key} />);
          })
        }
        {!data && <h3>Error en Script</h3>}
        <RaisedButton disabled={!validatorGeneral} style={{ float: 'right' }} primary icon={<FontIcon className="material-icons" >person_add</FontIcon>} label="Crear todos los avisos" onTouchTap={() => this.create()} />
      </Paper>
    );
  }
}
