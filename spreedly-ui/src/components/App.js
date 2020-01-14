import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SpreedlyShell from './spreedly/SpreedlyShell';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/spreedly" component={SpreedlyShell} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
