import './main-menu.css';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import logo from '../../resources/logo.png';
import {Link} from 'react-router-dom'

function MainMenu() {
  return (
    <div>
      <div> 
        <div className="template-logo-bg ">
          <img src={logo} className="template-logo" alt="logo" /> 
        </div>
      </div>
      <Divider />
      <List>
        <ListItem button key='Home'>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <Link to='/'><ListItemText primary='Início' /></Link>
        </ListItem>
        <ListItem button key='User'>
          <ListItemIcon><PersonAddIcon /></ListItemIcon>
          <Link to='/lista-usuarios'><ListItemText primary='Usuários' /></Link>
        </ListItem>
      </List>
    </div>
  );
}
export default MainMenu;
