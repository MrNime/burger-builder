import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseState() {
    // const sum = Object.keys(ingredients)
    //   .map(igKey => ingredients[igKey])
    //   .reduce((acc, el) => acc + el, 0);
    // this.setState(prevState => ({ purchasable: sum > 0 }));
    const purchasable = Object.values(this.state.ingredients).some(el => el > 0);
    this.setState({ purchasable });
  }

  addIngredientHandler = (type) => {
    this.setState(
      (prevState, props) => ({
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1,
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
      }),
      this.updatePurchaseState,
    );
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    this.setState(
      (prevState, props) => ({
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] - 1,
        },
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
      }),
      this.updatePurchaseState,
    );
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Nicky M',
        address: {
          street: 'Koekoeksstraat 70',
          zipCode: '9090',
          counry: 'Belgium',
        },
        email: 'manvan@melle.be',
      },
      deliveryMethod: 'express',
    };
    axios
      .post('/orders.json', order)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    const { ingredients } = this.state;
    // const disabledInfo = Object.assign(...Object.entries(ingredients).map(([key, value]) => ({
    //   [key]: value <= 0,
    // })));
    const disabledInfo = Object.entries(ingredients).reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: v <= 0,
      }),
      {},
    );
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}
