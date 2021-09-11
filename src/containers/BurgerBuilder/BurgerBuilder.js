import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuilControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import {
  addIngridients,
  removeIngridients,
  fetchIngridients,
} from "../../store/actions";
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onIngridientFetchHandler();
  }

  updatePurchasable(ingridients) {
    const sum = Object.keys(ingridients)
      .map((igKey) => {
        return ingridients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingridients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Sorry, Ingridients can't be loaded
      </p>
    ) : (
      <Spinner />
    );

    if (this.props.ingridients) {
      burger = (
        <Aux>
          <Burger ingridients={this.props.ingridients} />
          <BuilControls
            ingridientsAdded={this.props.onIngridientAddHandler}
            ingridientsRemoved={this.props.onIngridientRemoveHandler}
            disabled={disabledInfo}
            purchasable={this.updatePurchasable(this.props.ingridients)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingridients={this.props.ingridients}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = ({ ingridients, totalPrice, error }) => {
  return {
    ingridients,
    totalPrice,
    error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngridientAddHandler: (ingName) => dispatch(addIngridients(ingName)),
    onIngridientRemoveHandler: (ingName) =>
      dispatch(removeIngridients(ingName)),
    onIngridientFetchHandler: () => dispatch(fetchIngridients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
