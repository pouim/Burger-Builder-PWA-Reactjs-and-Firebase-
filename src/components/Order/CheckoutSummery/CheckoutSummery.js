import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.css';

const checkoutSummery = (props) => {
    return (
      <div className={classes.checkoutSummery}>
        <h1>We hope it tastes well!</h1> 
        <div style={{width: '100%', margin: 'auto'}}>
           <Burger ingredients = {props.ingredients} />
        </div>
        <Button 
          clicked={props.checkoutCanceled}
          btnType="Danger"
          >CANCEL</Button>
        <Button 
          clicked={props.checkoutConfirmed}
          btnType="Success">
          CONTINUE</Button>
      </div> 
    );
}

export default checkoutSummery;