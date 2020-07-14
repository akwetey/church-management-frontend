<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <a class="sidebar-brand">
        <span>CHMS</span>
      </a>

      <!-- <div class="sidebar-toggler not-active">
        <span></span>
        <span></span>
        <span></span>
      </div>-->
    </div>
    <div class="sidebar-body ps ps--active-y">
      <ul class="nav">
        <li class="nav-item nav-category">Main</li>
        <li class="nav-item">
          <router-link :to="{ name: 'Dashboard' }" class="nav-link">
            <i class="pi pi-microsoft link-icon"></i>

            <span class="link-title">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item nav-category">Navigation</li>

        <li class="nav-item">
          <router-link :to="{ name: 'Books' }" class="nav-link">
            <i class="link-icon pi pi-file-pdf"></i>
            <span class="link-title">Books</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'groups' }" class="nav-link">
            <i class="link-icon pi pi-users"></i>
            <span class="link-title">Groups</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a
            id="users-role-collapse-btn"
            class="nav-link"
            data-toggle="collapse"
            href="#users-roles"
            role="button"
            aria-expanded="false"
            aria-controls="users-roles"
          >
            <i class="link-icon pi pi-user"></i>
            <span class="link-title">Users & Roles</span>
            <i class="link-arrow pi pi-chevron-down"></i>
          </a>
          <div class="collapse" id="users-roles">
            <ul class="nav sub-menu">
              <li class="nav-item">
                <router-link :to="{ name: 'user' }" class="nav-link">Users</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'role' }" class="nav-link">Roles</router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import BSN from "bootstrap.native";

export default {
  name: "Sidebar",
  mounted() {
    new BSN.Collapse("#users-role-collapse-btn");
  }
};
</script>
