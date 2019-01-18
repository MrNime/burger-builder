import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   // This feels dirty, price in queryparams, security concern
  //   let price = 0;
  //   const ingredients = [...query.entries()].reduce((acc, [k, v]) => {
  //     if (k === 'price') {
  //       price = v;
  //       return acc;
  //     }
  //     return { ...acc, [k]: parseInt(v, 10) };
  //   }, {});
  //   this.setState({ ingredients, price });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let checkout = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased && <Redirect to="/" />;
      checkout = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>);
    }
    return checkout;
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);

