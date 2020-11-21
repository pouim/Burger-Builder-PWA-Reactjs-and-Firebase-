import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliari';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';



const burgerBuilder = props => {
    
    const [purchasing, setPurchasing] = useState(false);
    const { onInitIngredients } = props;
    useEffect(() => {
       onInitIngredients();

    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
           .map(igKey => {
               return ingredients[igKey];
           })
           .reduce((sum, el) => {
               return sum + el;
           }, 0);
         
         return sum > 0;
    };

    const purchaseHandler = () => {
       if(props.isAuth) {
          setPurchasing(true); 
       } else {
           props.onSetRedirectPath('/checkout');
           props.history.push('/auth');
       }
        
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');   
    }


        const disabledInfo = {
            ...props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummery = null;
       
        let burger = props.error ? <p style={{textAlign: 'center'}}>ingredients can't be loaded!</p>: <Spinner />
        if(props.ings) {
           burger =  
                <Aux>
                    <Burger ingredients={props.ings} />
                    <BuildControls 
                            ingredientAdded={props.onIngredientAdded} 
                            ingredientRemoved={props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={props.totalPrice}
                            ordered={purchaseHandler}
                            purchasable={updatePurchaseState(props.ings)}
                            isAuth={props.isAuth}
                    />
                </Aux> 

            orderSummery = <OrderSummery 
                            ingredients={props.ings} 
                            price={props.totalPrice}
                            purchaseCanceled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            />    
                
        }
        
                       
        return (
            <Aux>
               <Modal 
                   show={purchasing}
                   modalClosed={purchaseCancelHandler}
                   >
                   {orderSummery}
               </Modal>
               {burger}
            </Aux>
        );
};

const mapStateToProps = state => {
    return {
      ings: state.burgerReducer.ingredients,
      totalPrice: state.burgerReducer.totalPrice,
      error: state.burgerReducer.error,
      isAuth: state.authReducer.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
      onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));