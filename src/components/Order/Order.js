import React from 'react';
import classes from './Order.css';

export default function Order(props) {
  const ingredients = Object.entries(props.ingredients).map(([k, v]) => ({
    name: k,
    amount: v,
  }));

  return (
    <div className={classes.Order}>
      <p>
        Ingredients:{' '}
        {ingredients.map(ingredient => (
          <span key={ingredient.name} className={classes.Ingredient}>
            {ingredient.name} ({ingredient.amount})
          </span>
        ))}
      </p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
}
