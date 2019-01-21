import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions';

class Orders extends Component {
  componentDidMount = () => {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  };

  render() {
    const { loading, orders } = this.props;
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

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

