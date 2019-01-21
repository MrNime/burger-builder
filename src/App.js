import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';

class App extends React.Component {
  componentDidMount = () => {
    this.props.onTryAutoLogin();
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Layout>
        <Switch>
          { isAuthenticated && <Route path="/logout" component={Logout} /> }
          <Route path="/auth" component={Auth} />
          { isAuthenticated && <Route path="/checkout" component={Checkout} /> }
          { isAuthenticated && <Route path="/orders" component={Orders} /> }
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoLogin: () => dispatch(authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
