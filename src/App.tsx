// react libraries
import * as React from 'react';
import { withRouter } from 'react-router-dom';

// components
import NavBar from 'components/NavBar';
import Routes from './routes';

// tslint:disable-next-line:variable-name
export const App = ({ location }) => ((
  <React.Fragment>
      {location.pathname !== '/' && <NavBar location={location} />}
      <Routes />
  </React.Fragment>
));

export default withRouter(App);
