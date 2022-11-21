const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  let errors = {};

  // check the email field
  if (isEmpty(data.email)) {
    errors.email = "Email field can not be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid, please provide a valid email";
  }

  // check username field
  if (isEmpty(data.username)) {
    errors.username = "Name field can not be empty";
  } else if (!Validator.isLength(data.username, { min: 2, max: 10 })) {
    errors.username = "Name must be between 2 and 30 characters long";
  }

  // check password field
  if (isEmpty(data.password)) {
    errors.password = "Password field can not be empty";
  } else if (!Validator.isLength(data.password, { min: 6, max: 150 })) {
    errors.password = "Password must be between 6 and 150 characters long";
  }

  // check confirm password field
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field can not be empty";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and Confirm Password fields must match";
  }

  // check name field
  if (isEmpty(data.firstName)) {
    errors.firstName = "First name field can not be empty";
  } else if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.firstName = "Name must be between 2 and 30 characters long";
  }

   // check name field
   if (isEmpty(data.lastName)) {
    errors.lastName = "Last name field can not be empty";
  } else if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Name must be between 2 and 30 characters long";
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;