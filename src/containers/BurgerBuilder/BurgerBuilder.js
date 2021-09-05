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
import { ADD_INGS, REMOVE_INGS } from "../../store/actions";
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://gurman-myburger-default-rtdb.asia-southeast1.firebasedatabase.app/ingridients.json"
      )
      .then((response) => {
        this.setState({ ingridients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
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
    let burger = this.state.error ? (
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
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

const mapStateToProps = ({ ingridients, totalPrice }) => {
  return {
    ingridients,
    totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngridientAddHandler: (ingName) =>
      dispatch({ type: ADD_INGS, ingridientName: ingName }),
    onIngridientRemoveHandler: (ingName) =>
      dispatch({ type: REMOVE_INGS, ingridientName: ingName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
