import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Pagination from '../../components/UI/Pagination/Pagination';
import Aux from '../../hoc/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import classes from './Orders.css';

class Orders extends Component {

    state = {
        itemsPerPage: 3,
        activePage: 0,
        paginatedOrders: [],
        showOrderDetails: false,
        selectedOrder: null,
    }

    componentDidMount() {
       this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    setPageNumber = (currentPage) => {
        const paginatedOrders = this.props.orders
            .slice(currentPage * this.state.itemsPerPage, this.state.itemsPerPage * (currentPage + 1));
        this.setState({
            ...this.state,
            activePage: currentPage,
            paginatedOrders: paginatedOrders
        }); 
    }

    openModalDetailsHandler = (selectedOrder = null) => {
        this.setState({
            ...this.state,
            selectedOrder: selectedOrder,
            showOrderDetails: true
        })
    }

    closeModalDetailsHandler = () => {
        this.setState({
            ...this.state,
            selectedOrder: null,
            showOrderDetails: false
        })
    }

    render() {

        let orders = <Spinner />;
        let orderDetails = <Spinner />;

        if (!this.props.loading) {
            if (this.state.paginatedOrders.length > 0) {
                orders = this.state.paginatedOrders.map((order, index) => (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                            openDetails={() => this.openModalDetailsHandler(index)}/>
                    ));
            } else {
                this.setPageNumber(0);
            }

            if (this.state.selectedOrder !== null) {
                const selectedOrder = this.state.paginatedOrders[this.state.selectedOrder];
                orderDetails = (
                    <Aux>
                        <div className={classes.Details}>
                            <p>
                                <span className={classes.DetailsTitle}>Customer: </span><span>{selectedOrder.orderData.name}</span>
                            </p>
                            <p>
                                <span className={classes.DetailsTitle}>E-mail: </span><span>{selectedOrder.orderData.email}</span>
                            </p>
                            <p>
                                <span className={classes.DetailsTitle}>Address: </span><span>{selectedOrder.orderData.street} {selectedOrder.orderData.zipCode} {selectedOrder.orderData.country}</span>
                            </p>
                            <p>
                                <span className={classes.DetailsTitle}>Delivery Method: </span><span>{selectedOrder.orderData.deliveryMethod}</span>
                            </p>
                        </div>
                    </Aux>
                );
            }
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.showOrderDetails}
                    modalClosed={this.closeModalDetailsHandler}>
                    {orderDetails}
                    <div className={classes.AlignRight}>
                        <Button btnType={'Danger'} clicked={this.closeModalDetailsHandler}>Close</Button>
                    </div>
                </Modal>
                {orders}
                <Pagination
                    totalPages={Math.ceil(this.props.orders.length / this.state.itemsPerPage)}
                    activePage={this.state.activePage}
                    clicked={this.setPageNumber}>
                </Pagination>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));