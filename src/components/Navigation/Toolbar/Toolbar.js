import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

export default props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <NavigationItems />
  </header>
);