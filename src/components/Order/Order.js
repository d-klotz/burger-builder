import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = [];

    for (const ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName, 
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <span>Price: <strong>USD {props.price.toFixed(2)}</strong></span>
            <div className={classes.AlignRight}>
                <span className={classes.CursorPointer} onClick={props.openDetails}>Details</span>
            </div>
        </div>
    )
};

export default order;