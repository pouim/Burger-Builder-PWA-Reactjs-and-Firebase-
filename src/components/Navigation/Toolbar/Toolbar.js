import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from '../Toolbar/Toolbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
     <DrawerToggle clicked={props.toggleDrawerClick} />
     <Logo height="80%" />
     <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
     </nav>
  </header>
);

export default toolbar;