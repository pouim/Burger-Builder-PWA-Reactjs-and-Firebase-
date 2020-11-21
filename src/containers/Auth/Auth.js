import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

const auth = props => {
        const [controls, setControls] = useState({
           email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false

            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false

            }
       });
    const[isSignUp, setIsSignUp] = useState(true);

    const {buildingBurger, authRedirectPath, onSetRedirectPath} = props;

    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/') {
            onSetRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetRedirectPath]);


    const checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        } 

        return isValid;
    } 

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        };
        setControls(updatedControls);

    };

    const submitHandler = (event) => {
          event.preventDefault();
          props.onAuth(controls.email.value, controls.password.value, isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

   

        const formElementsArray = [];
            for(let key in controls) {
                formElementsArray.push({
                    id: key,
                    config: controls[key]
                });
            }

        let  form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value} 
                changed={(event) => inputChangedHandler(event, formElement.id)}
                inValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                                                     />                                        
        ))    
 
         if(props.loading) {
             form = <Spinner />
         } 

         let errorMessage = null;
         if(props.error) {
            errorMessage = <p>{props.error.message}</p>
         };

        return (
            !props.isAuth ?
            <div className={classes.Auth}>
              <form onSubmit={submitHandler}>
                <fieldset style={{border: 'none'}}>
                    <legend>{isSignUp? 'SignUP': 'Sign In'}</legend>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">SUBMIT</Button> 
                 </fieldset>
              </form>
                 <Button 
                    clicked={switchAuthModeHandler}
                    btnType="Danger">Switch to {isSignUp ? 'Sign In' : 'Sign Up'} </Button> 
            </div> 
            : <Redirect to= {props.authRedirectPath} />
        );

};

const mapDispatchToProps = dispatch => {
    return {
       onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
       onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

const mapStateToProps = state => {
    return {
       loading: state.authReducer.loading,
       error: state.authReducer.error,
       isAuth: state.authReducer.token !== null,
       buildingBurger: state.burgerReducer.building,
       authRedirectPath : state.authReducer.authRedirectPath 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);