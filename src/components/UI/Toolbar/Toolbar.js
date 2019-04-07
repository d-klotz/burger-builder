import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => (

    <header className={classes.Toolbar}>
        <div>Menu</div>
        <div className={classes.Logo}>
            <Logo></Logo>
        </div>
        <nav>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
);

export default toolbar;