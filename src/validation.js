import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, min, max, confirmed } from "vee-validate/dist/rules";

// Rules
extend("confirmed", {
  ...confirmed,
  message: "The {_field_} field does not match the confirmed field",
});

extend("min", {
  ...min,
  message: "The {_field_} field must have at least {length} characters",
});

extend("max", {
  ...max,
  message: "The {_field_} field must have at most {length} characters",
});

extend("required", {
  ...required,
  message: "The {_field_} field is required",
});

extend("email", {
  ...email,
  message: "The email address entered is invalid",
});

extend("decimal", {
  validate: (value, { decimals = "*", separator = "." } = {}) => {
    if (value === null || value === undefined || value === "") {
      return {
        valid: false,
      };
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      };
    }
    const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    );

    return {
      valid: regex.test(value),
    };
  },
  message: "The {_field_} field must contain only numeric values",
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
