import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

export default (props) => {
  // let transformedIngredients = Object.keys(props.ingredients)
  //   .map(igKey =>
  //     Array.from(new Array(props.ingredients[igKey]), (_, i) => (
  //       <BurgerIngredient key={igKey + i} type={igKey} />
  //     )))
  //   .reduce((acc, el) => acc.concat(el), []);

  // leaving comments here to see my attempts
  // const transformedIngredients = Object.entries(props.ingredients).map(ingArr =>
  // Array.from(new Array(ingArr[1]), (_, i) => (
  //   <BurgerIngredient key={ingArr[0] + i} type={ingArr[0]} />
  // )));

  // const transformedIngredients = Object.entries(props.ingredients).map(ingArr =>
  //   Array.from(new Array(ingArr[1]), (val, index) => (
  //     <BurgerIngredient key={ingArr[0] + index} type={ingArr[0]} />
  //   )));

  // const transformedIngredients = Object.keys(props.ingredients).map((igKey, i) =>
  //   Array(props.ingredients[igKey]).fill(<BurgerIngredient key={igKey + i} type={igKey} />));

  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>
      [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      )))
    .reduce((arr, el) => arr.concat(el), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
