import React from 'react'

export default function InputValidation(data, errors, setErrors, isRepeatedPassNeeded){
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&]).{6,}$/;

  let validationErrors = {...errors};

  if (!data.email) {
    validationErrors.email = "Email is required.";
  }
  else if (!emailRegex.test(data.email)) {
    validationErrors.email = "Incorrect email format.";
  }
  else{
    validationErrors.email = "";
  }

  if (!data.password) {
    validationErrors.password = "Password is required.";
  }
  else if (data.password.length < 6){
    validationErrors.password = "Password must be at least 6 characters long.";
  }
  else if (!passwordRegex.test(data.password)) {
    validationErrors.password = "Use at least one capitalized letter and one symbol.";
  }
  else{
    validationErrors.password = "";
  }

  if (isRepeatedPassNeeded && data.password !== data.repeatedPassword) {
    validationErrors.repeatedPassword = "Passwords do not match.";
  }
  else{
    validationErrors.repeatedPassword = "";
  }

  setErrors(validationErrors);

  return validationErrors;
}