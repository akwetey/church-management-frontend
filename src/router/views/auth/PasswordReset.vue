<template>
  <div>
    <div class="mb-4">
      <img :src="logo" alt="logo" height="40px" />
    </div>
    <h5 class="text-muted font-weight-normal mb-2">Forgot your password?</h5>
    <p class="text-muted mb-4">Please enter your email to request a password reset.</p>

    <div class="form-msg" ref="formMsg"></div>

    <form class="forms-sample" @submit.prevent="passwordReset">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
          v-model.trim="form.email"
          required
        />
      </div>

      <div class="mt-3">
        <button
          class="btn btn-primary mr-2 mb-2 mb-md-0 text-white px-5"
          ref="submitBtn"
        >Reset Password</button>
      </div>
      <router-link :to="{ name: 'Home' }" class="d-block mt-3 text-muted">Back to login</router-link>
    </form>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Auth from "@services/api/auth";
const logo = require("@assets/img/logo-long.png");

export default {
  name: "PasswordReset",
  data() {
    return {
      logo,
      form: { email: "" },
    };
  },
  methods: {
    passwordReset(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      formMsg.innerHTML = "";

      addBtnLoading(btn);

      Auth.passwordReset({ ...this.form })
        .then((response) => {
          const res = response.data;
          formMsg.innerHTML = `<div class="alert alert-success">${res.message}</div>`;
        })
        .catch((err) => {
          const { status, data } = err.response;
          let errorBag = "";
          if (status === 422) {
          } else {
            errorBag += data.message;
          }

          formMsg.innerHTML = `<div class="alert alert-danger">${errorBag}</div>`;
        })
        .finally(() => removeBtnLoading(btn));
    },
  },
};
</script>
