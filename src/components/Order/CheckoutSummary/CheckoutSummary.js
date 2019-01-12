import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

export default function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Almost ready to eat</h1>
      <div style={{ width: '100%' }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
      </div>
    </div>
  );
}
