import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
} from '../actions';


export function* purchaseBurgerSaga(action) {
  try {
    yield put(purchaseBurgerStart());
    const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(fetchOrdersStart());
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const response = yield axios.get(`/orders.json${queryParams}`);
    const orders = Object.entries(response.data).map(([k, v]) => ({
      id: k,
      ...v,
    }));
    yield put(fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(fetchOrdersFail(error));
  }
}
