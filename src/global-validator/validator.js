import { defineRule } from "vee-validate";
import { required, email, min, max, numeric } from "@vee-validate/rules";

defineRule("required", (value) => {
  if (required(value)) {
    return true;
  }
  return "Field is Required";
});

defineRule("requiredMinMax", (value) => {
  if (value) {
    if (required(value) && min(value, { length: 10 }) && max(value, { length: 10 })) {
      return true;
    }
    return "Invalid Order Number";
  } else {
    return "Field is Required";
  }
});

defineRule("email", (value) => {
  if (value) {
    if (email(value) && required(value)) {
      return true;
    }
    return "A valid email address is required";
  } else {
    return "Field is Required";
  }
});

defineRule("phone", (value) => {
  if (value) {
    if (required(value) && numeric(value) && min(value, { length: 10 }) && max(value, { length: 10 })) {
      return true;
    }
    return "Invalid Phone Number";
  } else {
    return "Field is Required";
  }
});

defineRule("password", (value) => {
  if (required(value) && min(value, { length: 5 }) && max(value, { length: 20 })) {
    return true;
  }
  return "Password must be between 5 and 20 Characters";
});

defineRule("confirmPassword", (value, [target], ctx) => {
  if (required(value) && value === ctx.form[target]) {
    return true;
  }
  return "Passwords must match";
});

defineRule("conditional", (value, [target], ctx) => {
  if (!ctx.form[target] || (ctx.form[target] && value && required(value))) {
    return true;
  }
  return "Field is Required";
});
