import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(error => this.setState({ error }));
  }

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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Nicky M',
        address: {
          street: 'Koekoekstraat 70',
          zipCode: '9090',
          counry: 'Belgium',
        },
        email: 'manvan@melle.be',
      },
      deliveryMethod: 'express',
    };
    axios
      .post('/orders.json', order)
      .then(res => this.setState({ loading: false, purchasing: false }))
      .catch(err => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    const { ingredients, error, loading } = this.state;
    // const disabledInfo = Object.assign(...Object.entries(ingredients).map(([key, value]) => ({
    //   [key]: value <= 0,
    // })));
    const disabledInfo =
      ingredients &&
      Object.entries(ingredients).reduce(
        (acc, [k, v]) => ({
          ...acc,
          [k]: v <= 0,
        }),
        {},
      );
    const modalContent = loading ? (
      <Spinner />
    ) : (
      ingredients && (
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      )
    );

    let burgerContent = error ? <p>Could not fetch ingredients</p> : <Spinner />;

    if (ingredients) {
      burgerContent = (
        <React.Fragment>
          <Burger ingredients={ingredients} />
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

    // let burgerContent = null;
    // if (error) {
    //   burgerContent = <p>Could not fetch ingredients</p>;
    // } else if (ingredients) {
    //   burgerContent = (
    //     <React.Fragment>
    //       <Burger ingredients={ingredients} />
    //       <BuildControls
    //         ingredientAdded={this.addIngredientHandler}
    //         ingredientRemoved={this.removeIngredientHandler}
    //         disabledInfo={disabledInfo}
    //         price={this.state.totalPrice}
    //         purchasable={this.state.purchasable}
    //         ordered={this.purchaseHandler}
    //       />
    //     </React.Fragment>
    //   );
    // } else {
    //   burgerContent = <Spinner />;
    // }

    // const burgerContent = this.state.ingredients ? (
    //   <React.Fragment>
    //     <Burger ingredients={this.state.ingredients} />
    //     <BuildControls
    //       ingredientAdded={this.addIngredientHandler}
    //       ingredientRemoved={this.removeIngredientHandler}
    //       disabledInfo={disabledInfo}
    //       price={this.state.totalPrice}
    //       purchasable={this.state.purchasable}
    //       ordered={this.purchaseHandler}
    //     />
    //   </React.Fragment>
    // ) : this.state.error ? (
    //   <p>Could not fetch ingredients</p>
    // ) : (
    //   <Spinner />
    // );
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {modalContent}
        </Modal>
        {burgerContent}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
