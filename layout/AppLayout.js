import { Component } from 'react';

import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';

import AuthService from './../services/auth';
import isEmptyObject from './../utils/isEmptyObject';

export default class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, loggedUser: {} };
  };

  componentDidMount() {
    this.authService = new AuthService();
    const profile = this.authService.getProfile();
    if (!isEmptyObject(profile)) {
      this.setState({
        isAuthenticated: true,
        loggedUser: {
          name: profile.display_name || profile.name,
          email: profile.email,
          picture: profile.picture,
        },
      });
    } else {
      this.setState({ isAuthenticated: false });
    }
  };

  handleLogin = () => this.authService.login();

  handleLogout = () => {
    this.authService.logout();
    window.location.href = '/';
  };

  render() {
    const { children  } = this.props;
    const { isAuthenticated, loggedUser } = this.state;
    return (
      <div>
        <AppNavbar
          handleLogin={ this.handleLogin }
          handleLogout={ this.handleLogout }
          isAuthenticated={ isAuthenticated }
          loggedUser={ loggedUser }
        />
        <main>{ children }</main>
        <AppFooter/>
      </div>
    );
  };
};