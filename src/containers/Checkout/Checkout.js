import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingridients: {
      salad: 1,
      meat: 1,
      cheese: 2,
      bacon: 1,
    },
  };

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  };
  onCheckoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingridients={this.state.ingridients}
          checkoutCancelled={this.onCheckoutCancelled}
          checkoutContinued={this.onCheckoutContinued}
        />
      </div>
    );
  }
}

export default Checkout;
