import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders, deleteOrder } from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      if (this.props.orders.length > 0) {
        orders = this.props.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingridients={order.ingridients}
              price={order.price}
              clicked={() => this.props.onDelete(order.id, this.props.token)}
            />
          );
        });
      } else {
        orders = (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            There is no orders, yet
          </span>
        );
      }
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    onDelete: (id, token) => dispatch(deleteOrder(id, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
