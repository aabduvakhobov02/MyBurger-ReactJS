import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let InputElement = null;
  switch (props.elementType) {
    case "input":
      InputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChanged}
        />
      );
      break;
    case "textarea":
      InputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChanged}
        />
      );
      break;
    case "select":
      InputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.onChanged}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      InputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChanged}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {InputElement}
    </div>
  );
};

export default input;
