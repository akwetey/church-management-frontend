<template>
  <div class="main-wrapper">
    <div class="page-wrapper full-page">
      <div class="page-content d-flex align-items-center justify-content-center">
        <div class="row w-100 mx-0 auth-page">
          <div class="col-md-8 col-xl-6 mx-auto">
            <div class="card">
              <div class="row">
                <div class="col-md-4 pr-md-0">
                  <div
                    class="auth-left-wrapper"
                    :style="{backgroundImage: 'url('+churchImg+')', backgroundPosition: 'top'}"
                  ></div>
                </div>
                <div class="col-md-8 pl-md-0 pb-md-5">
                  <div class="auth-form-wrapper px-4 py-5">
                    <router-view />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const churchImg = require("@assets/img/church.jpg");

export default {
  name: "AuthLayout",
  data() {
    return {
      churchImg
    };
  }
};
</script>
