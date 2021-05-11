import { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
  };
  login = () => this.props.handleLogin();
  logout = () => this.props.handleLogout();
  render() {
    const { isAuthenticated, loggedUser: { name, email, picture } } = this.props;

    return (
      <div>
        { isAuthenticated ? (
          <button onClick={ this.logout }>Salir</button>
        ) : (
          <button onClick={ this.login }>Login</button>
        ) }
      </div>
    );
  };
};

export default Navbar;
