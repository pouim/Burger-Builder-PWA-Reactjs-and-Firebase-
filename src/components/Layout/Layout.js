import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliari';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = props => {
 const [showSideDrawer, setShowSideDrawer] = useState(false);

    return (
      <Aux>
        <div >
          <Toolbar 
                 toggleDrawerClick={() => setShowSideDrawer(true)}
                 isAuth={props.isAuthenticated} 
                   />
          <SideDrawer 
             open={showSideDrawer} 
             closed={() => setShowSideDrawer(false)} 
             isAuth={props.isAuthenticated} 
             />
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
      </Aux>  
    );
};
  
const mapStateToProps = state => {
  return {
      isAuthenticated: state.authReducer.token !== null
  };
};

export default connect(mapStateToProps)(layout);



    
