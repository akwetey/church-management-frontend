<template>
  <nav class="navbar">
    <a href="#" class="sidebar-toggler">
      <i data-feather="menu"></i>
    </a>
    <div class="navbar-content">
      <form class="search-form">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="pi pi-search"></i>
            </div>
          </div>
          <input
            type="text"
            class="form-control"
            id="navbarForm"
            placeholder="Search name or telephone ..."
          />
        </div>
      </form>
      <ul class="navbar-nav">
        <li class="nav-item dropdown nav-profile">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="profileDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img :src="avatar" alt="profile" />
          </a>
          <div class="dropdown-menu" aria-labelledby="profileDropdown">
            <div class="dropdown-header d-flex flex-column align-items-center">
              <div class="figure mb-3">
                <img :src="avatar" alt="" />
              </div>
              <div class="info text-center">
                <p class="name font-weight-bold mb-0">{{ user.name }}</p>
                <p class="email text-muted mb-3">{{ user.email }}</p>
              </div>
            </div>
            <div class="dropdown-body">
              <ul class="profile-nav p-0 pt-3">
                <li class="nav-item">
                  <a href="" class="nav-link">
                    <i class="pr-2 pi pi-user"></i>
                    <span>Profile</span>
                  </a>
                </li>

                <li class="nav-item">
                  <a href="javascript:;" class="nav-link" @click="logout">
                    <i class="pr-2 pi pi-sign-out"></i>
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import BSN from "bootstrap.native";

export default {
  name: "Header",
  computed: {
    user() {
      return this.$store.getters.user;
    },
    avatar() {
      return this.$store.getters.avatar || this.$store.getters.defaultAvatar;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  mounted() {
    new BSN.Dropdown("#profileDropdown");
  },
};
</script>
