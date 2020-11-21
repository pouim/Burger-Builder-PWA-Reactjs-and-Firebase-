import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Logout from './Auth/Logout/Logout';
import { Switch, Route, withRouter, Redirect} from "react-router-dom";

    const Checkout = React.lazy(() => {
      return import('./Checkout/Checkout');
    });

    const Orders = React.lazy(() => {
      return import('./Orders/Orders');
    });

    const Auth = React.lazy(() => {
      return import('./Auth/Auth');
    });


    const app = props => {
      const { onCheckAuthStatus } = props;
      useEffect(() => {
        onCheckAuthStatus()
      }, [onCheckAuthStatus]);
  

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Redirect to="/" />
      </Switch>  
    );
    
    if(props.isAuth) {
       routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" render={(props) => <Checkout {...props} />} />
          <Route path="/orders" render={(props) => <Orders {...props} />} />
          <Route path="/auth" render={(props) => <Auth {...props} />} /> 
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>  
       );
    }

    return (
      <div>
        <Layout>
           <Suspense fallback={<p>Loading...</p>}>
             {routes}
           </Suspense> 
        </Layout>
      </div>
    );
  };


const mapDispatchToProps = dispatch => {
  return {
      onCheckAuthStatus: () => dispatch(actions.authCheckStatus())
  };
};

const mapStateToProps = state => {
  return {
     isAuth: state.authReducer.token !== null
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
