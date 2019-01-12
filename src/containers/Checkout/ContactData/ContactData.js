import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

export default class ContactData extends Component {
  state = {
    name: 'test',
    //   email: null,
    //   address: {
    //     street: null,
    //     number: null,
    //     postalCode: null,
    //   },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Nicky M',
        address: {
          street: 'Koekoekstraat 70',
          zipCode: '9090',
          country: 'Belgium',
        },
        email: 'manvan@melle.be',
      },
      deliveryMethod: 'express',
      gaanWeNietmeerDoenHe: true,
    };
    axios
      .post('/orders.json', order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => this.setState({ loading: false }));
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter you contact data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            <input
              className={classes.Input}
              type="text"
              name="name"
              placeholder="Your name"
              value={this.state.name}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
            <input
              className={classes.Input}
              type="email"
              name="email"
              placeholder="Your email"
            />
            <input
              className={classes.Input}
              type="text"
              name="street"
              placeholder="Street"
            />
            <input
              className={classes.Input}
              type="text"
              name="postal"
              placeholder="Postal Code"
            />
            <Button btnType="Success" type="submit">
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}
