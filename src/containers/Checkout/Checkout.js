import React, {} from 'react';
import { connect } from 'react-redux';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route,Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


const checkout = props => {

    const checkoutConfirmedHandler = () => {
       props.history.replace('/checkout/contact-data');
    }

    const checkoutCanceledHandler = () => {
       props.history.goBack();
    }


        let summary = <Redirect to="/" />
        if(props.ings) {
            let purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
            summary =   <div>
                            {purchasedRedirect}
                            <CheckoutSummery 
                                checkoutConfirmed={checkoutConfirmedHandler}
                                checkoutCanceled={checkoutCanceledHandler}
                                ingredients={props.ings} />

                            <Route path={props.match.path + '/contact-data'}
                                component={ContactData} />   
                        </div>           
             }
        return summary;
};


const mapStateToProps = state => {
    return {
      ings: state.burgerReducer.ingredients,
      purchased: state.orderReducer.purchased   
    };
};

export default connect(mapStateToProps)(checkout);