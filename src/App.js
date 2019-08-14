import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import Akis from "./components/akis";
import Profile from "./components/profile";
import Login from "./components/login";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = { validUser: null, navbarMargin: 0 };

  async componentDidMount() {
    const validUser = await auth.getCurrentUser();
    this.setState({ validUser });
  }

  onSize = size => {
    this.setState({ navbarMargin: size.height + 24 });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.validUser} onSize={this.onSize} />
        <div style={{ marginTop: this.state.navbarMargin }}>
          <Switch>
            {this.state.validUser && <Redirect exact to="/akis" from="/" />}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route
              path="/akis"
              render={props => (
                <Akis {...props} navbarMargin={this.state.navbarMargin} />
              )}
            />
            <Route path="/profile" render={props => <Profile {...props} />} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
