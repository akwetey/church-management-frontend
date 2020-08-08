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

export default {
  name: "MainLayout",
  components: { Header, Sidebar },
};
</script>
