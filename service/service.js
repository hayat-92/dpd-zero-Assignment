let checkBodyForRegister = (body) => {
  let requiredKeys = ["username", "email", "password", "full_name"];
  let missingKeys = [];
  requiredKeys.forEach((key) => {
    if (!body[key]) {
      missingKeys.push(key);
    }
  });
  return missingKeys;
};

let checkPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  let check = regex.test(password);
  if (!check) {
    return {
      status: "error",
      code: "INVALID_PASSWORD",
      message:
        "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
    };
  }
  return false;
};

let ageCheck = (age) => {
  if (age && isNaN(age)) {
    return {
      status: "error",
      code: "INVALID_AGE",
      message: "Invalid request. Age must be a number.",
    };
  }
  return false;
};

let genderCheck = (gender) => {
  if (!gender) {
    return {
      status: "error",
      code: "GENDER_REQUIRED",
      message:
        "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
    };
  }
  return false;
};

module.exports = {
  checkBodyForRegister,
  checkPassword,
  ageCheck,
  genderCheck,
};
