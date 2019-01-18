import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions';
import { getPrice } from '../../../store/selectors';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Your e-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'standard', displayValue: 'Standard' },
          ],
        },
        value: 'fastest',
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = Object.entries(this.state.orderForm).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: v.value }),
      {},
    );
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onOrderBurger(order);
  };

  checkValidity = (value, rules = {}) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = rules.minLength <= value.length && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const { value } = event.target;
    this.setState((prevState) => {
      const orderForm = {
        ...prevState.orderForm,
        [inputIdentifier]: {
          ...prevState.orderForm[inputIdentifier],
          value,
          valid: this.checkValidity(
            value,
            prevState.orderForm[inputIdentifier].validation,
          ),
          touched: true,
        },
      };
      const formIsValid = Object.values(orderForm).every(element =>
        (element.validation ? element.valid : true));
      return { orderForm, formIsValid };
    });
  };

  render() {
    const formElements = Object.entries(this.state.orderForm).map(([k, v]) => ({
      id: k,
      config: v,
    }));
    return (
      <div className={classes.ContactData}>
        <h4>Enter you contact data</h4>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {formElements.map(element => (
              <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={event => this.inputChangedHandler(event, element.id)}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
              />
            ))}
            <Button
              btnType="Success"
              type="submit"
              disabled={!this.state.formIsValid}
            >
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  price: getPrice(state.burgerBuilder.ingredients),
  loading: state.order.loading,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: orderData => dispatch(purchaseBurger(orderData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

