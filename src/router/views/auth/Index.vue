<template>
  <div>
    <h5 class="text-muted font-weight-normal mb-4">
      Welcome back! Log in to your account.
    </h5>

    <div class="form-msg" ref="formMsg"></div>

    <form class="forms-sample" @submit.prevent="login">
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
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model.trim="form.password"
          required
        />
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input shadow-none"
            id="remember-me"
          />
          <label class="custom-control-label" for="remember-me"
            >Remember me</label
          >
        </div>
      </div>
      <div class="mt-3">
        <button
          class="btn btn-primary mr-2 mb-2 mb-md-0 text-white px-5"
          ref="submitBtn"
        >
          Login
        </button>
      </div>
      <router-link
        :to="{ name: 'PasswordReset' }"
        class="d-block mt-3 text-muted"
        >Forgot password?</router-link
      >
    </form>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";

export default {
  name: "Login",
  data() {
    return {
      form: { email: "", password: "", remember: false },
    };
  },
  methods: {
    login(e) {
      const form = e.target;
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;

      formMsg.innerHTML = "";
      addBtnLoading(btn);

      this.$store
        .dispatch("login", this.form)
        .then(() => {
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(({ status, data }) => {
          removeBtnLoading(btn);
          let errorBag = "";

          if (status === 400) {
            data.errors.forEach(
              (error) => (errorBag += `<span class="d-block">${error}</span>`)
            );
          } else {
            errorBag += data.message;
          }
          formMsg.innerHTML = `<div class="alert alert-danger">${errorBag}</div>`;
        });
    },
  },
};
</script>
