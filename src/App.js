import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./store/actions/index";
import Home from "./components/home";
import Akis from "./components/akis";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Terms from "./components/terms";
import Privacy from "./components/privacy";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = { navbarMargin: 0 };

  async componentDidMount() {
    await this.props.onGetCurrentUser();
  }

  onSize = size => {
    this.setState({ navbarMargin: size.height + 24 });
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar onSize={this.onSize} />
        <div style={{ marginTop: this.state.navbarMargin }}>
          <Switch>
            {this.props.currentUser && <Redirect exact to="/akis" from="/" />}
            <Route path="/akis" component={Akis} />
            <Route exact path="/" component={Home} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurrentUser: () => dispatch(getCurrentUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
