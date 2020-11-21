import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
   <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {props.isAuth ?
             <NavigationItem link="/orders">Orders</NavigationItem> :
              null
              }
      {props.isAuth ?
             <NavigationItem link="/logout">Log out</NavigationItem> :
             <NavigationItem link="/auth">Authenticate</NavigationItem>
              }
      
   </ul>
);

export default navigationItems;