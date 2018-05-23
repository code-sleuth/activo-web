import * as React from 'react';
import './AuthPage.scss';

class AuthPage extends React.Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      errorMessage: ''
    };
  }

  onChange = (event) => {
    event.preventDefault();
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.onChange}>Click Me!</button>
      </div>
    );
  }
}

export default AuthPage;
