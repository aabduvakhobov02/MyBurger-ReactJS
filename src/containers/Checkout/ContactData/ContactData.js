import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import { purchaseBurger } from "../../../store/actions";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { checkValidity } from "../../../shared/validation";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        valid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Email",
        },
        value: "",
        valid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      phoneNumber: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Phone Number",
        },
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 7,
        },
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        valid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        valid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
        validation: {},
      },
      comments: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Any extra comments...",
        },
        value: "",
        valid: true,
        validation: {},
      },
    },
    formIsValid: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onBurgerOrdered(order, this.props.token);
  };

  onInputChangedHandler = (event, inputIndentifier) => {
    const newOrderForm = { ...this.state.orderForm };
    const newFormElement = { ...newOrderForm[inputIndentifier] };

    newFormElement.value = event.target.value;
    newFormElement.touched = true;
    newFormElement.valid = checkValidity(
      newFormElement.value,
      newFormElement.validation
    );
    newOrderForm[inputIndentifier] = newFormElement;

    let formIsValid = true;
    for (let inputIndentifier in newOrderForm) {
      formIsValid = newOrderForm[inputIndentifier].valid && formIsValid;
    }
    this.setState({ orderForm: newOrderForm, formIsValid: formIsValid });
  };
  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            onChanged={(event) => this.onInputChangedHandler(event, element.id)}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ingridients: state.burgerBuilder.ingridients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerOrdered: (orderData, token) =>
      dispatch(purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
