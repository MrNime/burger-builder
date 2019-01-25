import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import { getPrice } from '../../store/selectors';

export class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.onInitIngredients();
    this.setState({ loading: false });
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };

  updatePurchaseState() {
    const purchasable = Object.values(this.props.ingredients || {}).some(el => el > 0);
    this.setState({ purchasable });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // Object.entries(this.props.ingredients).map(([k, v]) =>
    //   queryParams.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`));

    // queryParams.push(`price=${this.props.totalPrice}`);
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout',
    });
  };

  render() {
    const { loading } = this.state;
    const { ingredients, error } = this.props;
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
          price={this.props.totalPrice}
        />
      )
    );

    let burgerContent = error ? (
      <p>Could not fetch ingredients</p>
    ) : (
      <Spinner />
    );

    if (ingredients) {
      burgerContent = (
        <React.Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={async (ingredientName) => {
              await this.props.onAddIngredient(ingredientName);
              this.updatePurchaseState();
            }}
            ingredientRemoved={async (ingredientName) => {
              await this.props.onRemoveIngredient(ingredientName);
              this.updatePurchaseState();
            }}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {modalContent}
        </Modal>
        {burgerContent}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: getPrice(state.burgerBuilder.ingredients),
  error: state.burgerBuilder.error,
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onAddIngredient: ingredientName =>
    dispatch(actions.addIngredient(ingredientName)),
  onRemoveIngredient: ingredientName =>
    dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
