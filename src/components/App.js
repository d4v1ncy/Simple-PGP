import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import appStore from 'stores/appStore';
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';
import Main from 'components/Main';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'utils/constants';
import { enableLogging } from 'mobx-logger';

enableLogging({
  action: true,
  reaction: true,
  transaction: true,
  compute: true,
});

const componentStyles = StyleSheet.create({
  component: {
    display: 'flex',
    height: '100%',
    backgroundColor: colours.clouds,
  },
});

const checkAuth = (nextState, replace) => {
  if (!appStore.loggedIn) {
    replace('/login');
  }
};

const routes = (
  <Route path="/" component={Main}>
    <IndexRedirect to="/dashboard" />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} onEnter={checkAuth} />
  </Route>
);

@observer
export default class App extends Component {

  render() {
    return (
      <Provider appStore={appStore}>
        <div className={css(componentStyles.component)}>
          <Router history={hashHistory}>
            {routes}
          </Router>
        </div>
      </Provider>
    );
  }

}
