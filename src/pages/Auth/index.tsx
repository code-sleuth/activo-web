import * as React from 'react';
import AuthPage from './AuthPage.component';
import './AuthPage.scss';

class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <h1 className="h1-tag"> Typescript rendering </h1>
        <AuthPage />
      </div>
    );
  }
}

export default App;
