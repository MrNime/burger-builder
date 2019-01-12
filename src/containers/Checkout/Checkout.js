import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
    price: 0,
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    // This feels dirty, price in queryparams, security concern
    let price = 0;
    const ingredients = [...query.entries()].reduce((acc, [k, v]) => {
      if (k === 'price') {
        price = v;
        return acc;
      }
      return { ...acc, [k]: parseInt(v, 10) };
    }, {});
    this.setState({ ingredients, price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
