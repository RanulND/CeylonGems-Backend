const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  // data.firstName = !isEmpty(data.firtsName) ? data.firtsName : "";
  // data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  // data.phoneNumber = !isEmpty(data.phoneNumber) ? data.lastName : "";
  // data.nic = !isEmpty(data.nic) ? data.nic : "";
  // data.email = !isEmpty(data.email) ? data.email : "";
  // data.password = !isEmpty(data.password) ? data.password : "";
  
// First Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.name = "Name field is required";
  }
// Last Name checks
  if (Validator.isEmpty(data.lastName)) {
    errors.name = "Name field is required";
  }
// phone number checks
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.name = "Phone Number field is required";
  }
// nic checks
  if (Validator.isEmpty(data.nic)) {
    errors.name = "NIC field is required";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
 
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};