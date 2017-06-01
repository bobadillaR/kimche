import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { red500, yellow500, blue500, green500 } from 'material-ui/styles/colors';

export default class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentWillMount() {
    const { time } = this.props;
    if (time > 0) {
      setTimeout(() => {
        this.setState({ visible: false });
        this.props.onClose();
      }, time);
    }
  }

  componentWillReceiveProps() {
    const { time } = this.props;
    if (time > 0) {
      setTimeout(() => {
        this.setState({ visible: false });
        this.props.onClose();
      }, time);
    }
  }

  tipoColor() {
    const { tipo } = this.props;
    if (tipo === 'success') return green500;
    else if (tipo === 'info') return blue500;
    else if (tipo === 'warning') return yellow500;
    else return red500;
  }

  tipoIcon() {
    const { tipo } = this.props;
    if (tipo === 'success') return 'done';
    else if (tipo === 'info') return 'info_outline';
    else if (tipo === 'warning') return 'warning';
    else return 'error';
  }

  render() {
    const { message } = this.props;
    const { visible } = this.state;
    return (
      <div>
        {visible &&
          <Paper style={{ backgroundColor: this.tipoColor(), marginTop: 10, marginBottom: 10, alignItems: 'center', display: 'flex', paddingRight: '2%', padding: 5 }} zDepth={1} >
            <FontIcon style={{ marginLeft: '5%', marginRight: '5%' }} className="material-icons">{this.tipoIcon()}</FontIcon>
            {message}
          </Paper>
        }
      </div>
    );
  }
}
