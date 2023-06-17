import React, { useState } from "react";
import PropTypes from "prop-types";

export const useInput = (defaultValue = "") => {
  const [value, setValue] = useState("");

  const onValueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return [value, onValueChangeHandler];
};

useInput.propTypes = {
  defaultValue: PropTypes.string
}