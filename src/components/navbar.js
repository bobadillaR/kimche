import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import { cyan500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import logo from '../components/landingPage/img/logo.png';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openSupport: false,
      supportText: '',
    };
  }

  sendEmail() {
    const { database, user, userData } = this.props;
    const { supportText } = this.state;
    database.child('support').push({
      userId: user.uid,
      name: userData.name,
      text: supportText,
      mail: user.email,
    }).then(() => this.setState({ openSupport: false }));
  }

  renderMain() {
    const { mobileDetect, user, userData, userAdmin, width } = this.props;
    return (
      <ToolbarGroup>
        <ToolbarSeparator style={{ marginRight: 10 }} />
        {user && userData !== null ?
          <div>
            {userAdmin ?
              <Link to="/admin">
                {mobileDetect || width < 773 ?
                  <FloatingActionButton mini>
                    <FontIcon className="material-icons" >star</FontIcon>
                  </FloatingActionButton>
                  :
                  <RaisedButton label={`Entrar ${userData.name}`} primary icon={<FontIcon className="material-icons" >star</FontIcon>} />
                }
              </Link>
              :
              <Link to="/main">
                {mobileDetect || width < 773 ?
                  <FloatingActionButton mini>
                    <FontIcon className="material-icons" >face</FontIcon>
                  </FloatingActionButton>
                  :
                  <RaisedButton label={`Entrar ${userData.name}`} primary icon={<FontIcon className="material-icons" >face</FontIcon>} />
                }
              </Link>
            }
          </div>
          :
          <Link to="/login">
            {mobileDetect || width < 773 ?
              <FloatingActionButton mini>
                <FontIcon className="material-icons" >person</FontIcon>
              </FloatingActionButton>
              :
              <RaisedButton label="Iniciar Sesion" primary icon={<FontIcon className="material-icons" >person</FontIcon>} />
            }
          </Link>
        }
      </ToolbarGroup>
    );
  }

  renderUser() {
    const { userAdmin, userData, width, mobileDetect } = this.props;
    return (
      <ToolbarGroup>
        {userAdmin &&
          <ToolbarGroup>
            <Link to="/admin/users">
              {mobileDetect || width < 773 ?
                <FloatingActionButton mini>
                  <FontIcon className="material-icons" >person</FontIcon>
                </FloatingActionButton>
                :
                <FlatButton style={{ marginLeft: 0, marginRight: 0 }} label="Usuarios" primary icon={<FontIcon className="material-icons" >person</FontIcon>} />
              }
            </Link>
            <Link to="/admin/schools">
              {mobileDetect || width < 773 ?
                <FloatingActionButton mini>
                  <FontIcon className="material-icons" >school</FontIcon>
                </FloatingActionButton>
                :
                <FlatButton style={{ marginLeft: 0, marginRight: 0 }} label="Colegios" primary icon={<FontIcon className="material-icons" >school</FontIcon>} />
              }
            </Link>
            <Link to="/admin/messages">
              {mobileDetect || width < 773 ?
                <FloatingActionButton mini>
                  <FontIcon className="material-icons" >message</FontIcon>
                </FloatingActionButton>
                :
                <FlatButton style={{ marginLeft: 0, marginRight: 0 }} label="Avisos" primary icon={<FontIcon className="material-icons" >message</FontIcon>} />
              }
            </Link>
          </ToolbarGroup>
        }
        <ToolbarSeparator />
        <IconMenu
          style={{ paddingLeft: 10, cursor: 'pointer' }}
          iconButtonElement={<FontIcon color={cyan500} className="material-icons">account_circle</FontIcon>}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText={userData !== null && userData.name} rightIcon={<FontIcon className="material-icons">person</FontIcon>} />
          <Divider />
          <MenuItem primaryText="Soporte" onTouchTap={() => this.setState({ openSupport: true })} rightIcon={<FontIcon className="material-icons">live_help</FontIcon>} />
          <Divider />
          <MenuItem primaryText="Mi Usuario" onTouchTap={() => this.props.history.push('/myUser')} rightIcon={<FontIcon className="material-icons">settings</FontIcon>} />
          <MenuItem primaryText="Desconectarse" onTouchTap={() => { this.props.history.push('/'); this.props.onLogout(); }} rightIcon={<FontIcon className="material-icons">settings_power</FontIcon>} />
        </IconMenu>
      </ToolbarGroup>
    );
  }

  render() {
    const { location, update, user, userAdmin } = this.props;
    let toImage = '/';
    if (!update && !(location.pathname === '/' || location.pathname === '/login')) {
      if (userAdmin) toImage = '/admin';
      else toImage = '/main';
    }
    return (
      <Toolbar style={{ position: 'fixed', top: 0, width: '100%', zIndex: 20 }}>
        <Link to={toImage} >
          <img alt="dsadas" src={logo} height={40} style={{ marginTop: 8 }} />
        </Link>
        <ToolbarGroup>
          {update ?
            <CircularProgress />
            :
            <div>
              {(location.pathname === '/' || location.pathname === '/login') || !user ? this.renderMain() : this.renderUser()}
            </div>
          }
        </ToolbarGroup>
        <Dialog
          title="Soporte"
          actions={[
            <FlatButton label="Cerrar" primary onTouchTap={() => this.setState({ openSupport: false })} />,
            <FlatButton label="Enviar" primary onTouchTap={() => this.sendEmail()} />,
          ]}
          modal={false}
          open={this.state.openSupport}
          onRequestClose={() => this.setState({ openSupport: false })}
        >
          <p>Envianos un mensaje para ayudarte: </p>
          <TextField
            hintText="Mensaje"
            multiLine
            rows={2}
            rowsMax={4}
            fullWidth
            onChange={(event, value) => this.setState({ supportText: value })}
          /><br />
        </Dialog>
      </Toolbar>
    );
  }
}

export default withRouter(Navbar);
