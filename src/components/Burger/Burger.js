import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

export default (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(igKey =>
    [...Array(props.ingredients[igKey])].map((_, i) => (
      <BurgerIngredient key={igKey + i} type={igKey} />
    )));

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
