import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Your Street name"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;