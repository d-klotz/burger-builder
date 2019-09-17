import React from 'react';
import classes from './Badge.css';

const Badge = (props) => (
  <span className={[classes.Badge, classes[props.badgeStyle]].join(' ')}>
    {props.child}
  </span>
)

export default Badge;
