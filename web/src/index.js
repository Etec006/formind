import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import 'assets/scss/argon-design-system-react.scss?v1.1.0';

import Login from 'views/pages/Login.js';
import Profile from 'views/pages/Profile.js';
import Register from 'views/pages/Register.js';
import Home from 'views/pages/Home.js';
import Principal from 'views/pages/Principal.js';
import Modulo from 'views/pages/Modulo.js';
import Search from 'views/pages/Search.js';
import Session from 'views/pages/Session.js';
import Test from 'views/pages/Test.js';
import TestProd from 'views/pages/TestProd.js';
import SelectContent from 'views/pages/SelectContent.js';
import TestCreator from 'views/pages/TestCreator.js';
import ProducerViewModule from 'views/pages/ProducerViewModule.js';
import ProduceModule from 'views/pages/ProduceModule.js';
import { getToken } from "utils/authenticate";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route 
        path="/" 
        exact 
        render={!getToken() ? props => <Home {...props} /> : props => <Principal {...props} />} 
      />
      <Route
        path="/principal"
        exact
        render={props => <Principal {...props} />}
      />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route path="/perfil" exact render={props => <Profile {...props} />} />
      <Route path="/perfil/:id" exact render={props => <Profile {...props} />} />
      <Route
        path="/register-page"
        exact
        render={props => <Register {...props} />}
      />
      <Route path="/search" exact render={props => <Search {...props} />} />
      <Route
        path="/session/:id"
        exact
        render={props => <Session {...props} />}
      />
      <Route
        path="/testcreator"
        exact
        render={props => <TestCreator {...props} />}
      />
      <Route path="/testprod" exact render={props => <TestProd {...props} />} />
      <Route
        path="/selectcontent"
        exact
        render={props => <SelectContent {...props} />}
      />
      <Route path="/test" exact render={props => <Test {...props} />} />
      <Route
        path="/producer/viewmodule"
        exact
        render={props => <ProducerViewModule {...props} />}
      />
      <Route
        path="/producer/module"
        exact
        render={props => <ProduceModule {...props} />}
      />
      <Route path="/modulo/:id" exact render={props => <Modulo {...props} />} />

      <Route
        path="/producer/module/:id"
        exact
        render={props => <ProduceModule {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
