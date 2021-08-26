import classes from './Menu.module.css';
import React from 'react';

const menu = (props) => (
    <div className={classes.Menu} onClick = {props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default menu;