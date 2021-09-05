import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
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
          ingridients={this.props.ingridients}
          checkoutCancelled={this.onCheckoutCancelled}
          checkoutContinued={this.onCheckoutContinued}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
        )} />
      </div>
    );
  }
}

const mapStateToProps = ({ ingridients }) => {
  return {
    ingridients,
  };
};

export default connect(mapStateToProps)(Checkout);
