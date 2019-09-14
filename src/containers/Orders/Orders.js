import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Pagination from '../../components/UI/Pagination/Pagination';

class Orders extends Component {

    state = {
        itemsPerPage: 3,
        activePage: 0,
        paginatedOrders: []
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

    render() {

        let orders = <Spinner />;

        if (!this.props.loading) {

            if (this.state.paginatedOrders.length > 0) {
                orders = this.state.paginatedOrders.map(order => (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price} />
                    ));
            } else {
                this.setPageNumber(0);
            }

        }
        return (
            <div>
                {orders}
                <Pagination
                    totalPages={Math.ceil(this.props.orders.length / this.state.itemsPerPage)}
                    activePage={this.state.activePage}
                    clicked={this.setPageNumber}>
                </Pagination>

            </div>
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