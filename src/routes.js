import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
// import HomePage from './components/HomePage';
import QuizContainer from './containers/QuizContainer';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';
import InfoBox from './components/InfoBox';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={QuizContainer}/>
    <Route path="about" component={AboutPage}/>
    <Route path="info" component={InfoBox}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
