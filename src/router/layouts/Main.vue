<template>
  <div class="main-wrapper">
    <Sidebar />

    <div class="page-wrapper">
      <Header />

      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@components/includes/Header";
import Sidebar from "@components/includes/Sidebar";
import Axios from "@services/api/axios";

export default {
  name: "MainLayout",
  components: { Header, Sidebar },
  mounted() {
    // Request interceptor
    Axios.interceptors.request.use(function (config) {
      const token = localStorage.getItem("_chms_token");
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });

    // Response interceptor
    Axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>
