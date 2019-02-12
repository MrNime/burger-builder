import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { authCheckState } from './store/actions';
import Spinner from './components/UI/Spinner/Spinner';

// Bug in react-router throws Failed prop type:
// Invalid prop `component` of type `object` supplied to `Route`, expected `function`.
// fixed in beta release of react-router
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends React.Component {
  componentDidMount = () => {
    this.props.onTryAutoLogin();
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Layout>
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            {isAuthenticated && <Route path="/logout" component={Logout} />}
            <Route path="/auth" component={Auth} />
            {isAuthenticated && <Route path="/checkout" component={Checkout} />}
            {isAuthenticated && <Route path="/orders" component={Orders} />}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </React.Suspense>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
