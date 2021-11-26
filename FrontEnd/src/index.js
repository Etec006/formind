import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import 'assets/scss/argon-design-system-react.scss?v1.1.0';

import Index from 'views/Index.js';
import Landing from 'views/pages/Landing.js';
import Login from 'views/pages/Login.js';
import Profile from 'views/pages/Profile.js';
import Register from 'views/pages/Register.js';
import Home from 'views/pages/Home.js';
import Principal from 'views/pages/Principal.js';
import Produtor from 'views/pages/Produtor.js';
import ViewProdutor from 'views/pages/ViewProdutor.js';
import PrincipalSlider from 'views/pages/PrincipalSlider.js';
import Modulo from 'views/pages/Modulo.js';
import Search from 'views/pages/Search.js';
import Session from 'views/pages/Session.js';
import Test from 'views/pages/Test.js';
import TestProd from 'views/pages/TestProd.js';
import SelectContent from 'views/pages/SelectContent.js';
import TestCreator from 'views/pages/TestCreator.js';
import ViewModule from 'views/pages/ViewModule.js';
import SaveModule from 'views/pages/SaveModule.js';
import EditSession from 'views/pages/EditSession.js';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route
        path="/landing-page"
        exact
        render={props => <Landing {...props} />}
      />
      <Route path="/index" exact render={props => <Index {...props} />} />
      <Route
        path="/principal"
        exact
        render={props => <Principal {...props} />}
      />
      <Route path="/principal" exact render={props => <Landing {...props} />} />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route path="/perfil" exact render={props => <Profile {...props} />} />
      <Route
        path="/register-page"
        exact
        render={props => <Register {...props} />}
      />
      <Route path="/home" exact render={props => <Home {...props} />} />
      <Route path="/creator" exact render={props => <Produtor {...props} />} />
      <Route
        path="/viewcreator"
        exact
        render={props => <ViewProdutor {...props} />}
      />
      <Route
        path="/slider"
        exact
        render={props => <PrincipalSlider {...props} />}
      />
      <Route path="/search" exact render={props => <Search {...props} />} />
      <Route
        path="/session/:id"
        exact
        render={props => <Session {...props} />}
      />
      <Route path="/modulo/:id" exact render={props => <Modulo {...props} />} />
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
        path="/viewmodule"
        exact
        render={props => <ViewModule {...props} />}
      />
      <Route
        path="/modulo/criar"
        exact
        render={props => <SaveModule {...props} />}
      />

      <Route
        path="/editmodule/:id"
        exact
        render={props => <SaveModule {...props} />}
      />
      <Route
        path="/editsession"
        exact
        render={props => <EditSession {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
