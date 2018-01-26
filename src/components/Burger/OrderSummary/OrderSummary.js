import React from 'react';

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
      <p>Continue to Checkout?</p>
    </React.Fragment>
  );
};
