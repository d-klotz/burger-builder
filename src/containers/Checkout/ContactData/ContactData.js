import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler= (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            name: 'Daniel Klotz',
            address: {
                street: 'Streettest 1',
                zipCode:'45139',
                country: 'Germany'
            },
            email: 'danielfelipeklotz@gmail.com',
            deliveryMethod: 'fastest'
        }
         axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading : false});
                this.props.history.push('/');
            })
            .catch(error => this.setState({loading : false}));
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your Street name"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;