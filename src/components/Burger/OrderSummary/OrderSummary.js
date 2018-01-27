import React from 'react';
import Button from '../../UI/Button/Button';

export default (props) => {
  const ingredientSummary = Object.entries(props.ingredients).map(([k, v]) => (
    <li key={k}>
      <span style={{ textTransform: 'capitalize' }}>{k}</span>: {v}
    </li>
  ));
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};
