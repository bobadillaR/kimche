import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import logo from '../components/landingPage/img/logo.png';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { mobileDetect, userData, user, auth, update } = this.props;
    return (
      <Toolbar primary>
        <Link to="/" >
          <img alt="dsadas" src={logo} height={40} style={{ marginTop: 8 }} />
        </Link>
        {user ?
          <ToolbarGroup>
            {userData.admin &&
              <ToolbarGroup>
                <Link to="/admin/users">
                  <FlatButton style={{ marginLeft: 0, marginRight: 0 }} label="Usuarios" primary icon={<FontIcon className="material-icons" >person</FontIcon>} />
                </Link>
                <Link to="/admin/schools">
                  <FlatButton style={{ marginLeft: 0, marginRight: 0 }} label="Colegios" primary icon={<FontIcon className="material-icons" >school</FontIcon>} />
                </Link>
                <Link to="/admin/messages">
                  <FlatButton style={{ marginLeft: 0, marginRight: 0 }} label="Avisos" primary icon={<FontIcon className="material-icons" >message</FontIcon>} />
                </Link>
              </ToolbarGroup>
            }
            <ToolbarSeparator />
            <ToolbarTitle style={{ marginLeft: 20, paddingRight: 0 }} text={userData.nombre} />
            <ToolbarSeparator />
            <IconMenu style={{ paddingLeft: 10, cursor: 'pointer'}} iconButtonElement={<FontIcon style={{color: 'white'}} className="material-icons">account_circle</FontIcon>} anchorOrigin={{ horizontal: 'left', vertical: 'top' }} targetOrigin={{ horizontal: 'left', vertical: 'top' }}>
              <MenuItem primaryText="Mi Usuario" />
              <MenuItem primaryText="Desconectarse" onTouchTap={() => auth.signOut().then(() => this.props.history.push('/'))} />
            </IconMenu>
          </ToolbarGroup>
        :
          <ToolbarGroup>
            <ToolbarSeparator />
            <Link to="/login" style={{ marginLeft: 10 }} >
              {mobileDetect.mobile() === null ?
                update ?
                  <CircularProgress />
                  :
                  <RaisedButton label="Iniciar Sesion" primary icon={<FontIcon className="material-icons" >person</FontIcon>} />
                :
                  <FloatingActionButton mini>
                    <FontIcon className="material-icons" >person</FontIcon>
                  </FloatingActionButton>
              }
            </Link>
          </ToolbarGroup>
        }
      </Toolbar>
    );
  }
}

export default withRouter(Navbar);
