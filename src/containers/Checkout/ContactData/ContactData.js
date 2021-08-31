import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

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
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/orders");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
  }
  onInputChangedHandler = (event, inputIndentifier) => {
    const newOrderForm = { ...this.state.orderForm };
    const newFormElement = { ...newOrderForm[inputIndentifier] };

    newFormElement.value = event.target.value;
    newFormElement.touched = true;
    newFormElement.valid = this.checkValidity(
      newFormElement.value,
      newFormElement.validation
    );
    newOrderForm[inputIndentifier] = newFormElement;

    let formIsValid = true;
    for (let inputIndentifier in newOrderForm) {
      formIsValid = newOrderForm[inputIndentifier].valid && formIsValid;
    }
    console.log(formIsValid);
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
    if (this.state.loading) {
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

export default withRouter(ContactData);
