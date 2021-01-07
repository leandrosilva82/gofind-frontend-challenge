import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../home/home';
import EditaUsuario from '../usuarios/edita-usuario';
import ListaUsuarios from '../usuarios/lista-usuarios';

function Rotas() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} /> 
        <Route exact path='/lista-usuarios' component={ListaUsuarios} /> 
        <Route exact path='/edita-usuario/:id' component={EditaUsuario} /> 
      </Switch>
    </div>
  );
}
export default Rotas;