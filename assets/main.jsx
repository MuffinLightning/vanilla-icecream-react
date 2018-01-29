import 'styles/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import App from 'components/App/App';
import Error from 'components/Error/Error';

render(
    <Router history={browserHistory}>
      <Route path="*" component={App} />
    </Router>, document.getElementById('app'));
