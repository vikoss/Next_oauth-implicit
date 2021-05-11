import { Component } from 'react';
import AuthService from './../services/auth';

class CallBackPage extends Component {
  componentDidMount() {
    this.authService = new AuthService();
    this.authService.handleAuthentication()
      .finally(() => window.location.href = '/');
  };

  render() {
    return (
      <div>
        <img alt="Test"/>
        <div>
          <h1>Autenticado</h1>
          
        </div>
      </div>
    );
  };
};

export default CallBackPage;
