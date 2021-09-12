import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
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
    let summary = <Redirect to="/" />;
    if (this.props.ingridients) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/orders" />
      ) : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingridients={this.props.ingridients}
            checkoutCancelled={this.onCheckoutCancelled}
            checkoutContinued={this.onCheckoutContinued}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.burgerBuilder.ingridients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
