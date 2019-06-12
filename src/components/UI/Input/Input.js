import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.Input]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case('input'):
            inputElement = <input
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                onChange={props.changed} 
                value={props.value}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                onChange={props.changed} 
                value={props.value}/>;
            break;
        case('select'):
        inputElement = (
        <select 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option => (
                <option value={option.value}>
                    {option.displayValue}
                </option>
            ))}
        </select>
        );
        break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                onChange={props.changed} 
                value={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;