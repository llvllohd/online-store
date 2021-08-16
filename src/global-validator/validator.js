import { defineRule } from "vee-validate";
import { required, email, min, max } from "@vee-validate/rules";

defineRule("required", (value) => {
  if (required(value)) {
    return true;
  }
  return "Field is Required";
});

defineRule("email", (value) => {
  if (value) {
    if (email(value) && required(value)) {
      return true;
    }
    return "A valid email address is required";
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
