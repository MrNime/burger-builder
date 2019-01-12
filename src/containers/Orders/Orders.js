import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount = () => {
    axios
      .get('/orders.json')
      .then((res) => {
        const orders = Object.entries(res.data).map(([k, v]) => ({ id: k, ...v }));
        this.setState({ loading: false, orders });
      })
      .catch(err => this.setState({ loading: false }));
  };

  render() {
    const { loading, orders } = this.state;
    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            {orders.map(order => (<Order
              key={order.id}
              price={parseFloat(order.price)}
              ingredients={order.ingredients}
            />))}
          </div>
        )}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);

