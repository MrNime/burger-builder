import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  id,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = orderData => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then((res) => {
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    })
    .catch(err => dispatch(purchaseBurgerFail(err)));
};

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios
    .get('/orders.json')
    .then((res) => {
      const orders = Object.entries(res.data).map(([k, v]) => ({ id: k, ...v }));
      dispatch(fetchOrdersSuccess(orders));
    })
    .catch(err => dispatch(fetchOrdersFail(err)));
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

