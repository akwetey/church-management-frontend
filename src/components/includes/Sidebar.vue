<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <a class="sidebar-brand">
        <img :src="logo" class="img-fluid" alt="logo" />
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

        <!-- <li class="nav-item">
          <router-link :to="{ name: 'Books' }" class="nav-link">
            <i class="link-icon pi pi-file-pdf"></i>
            <span class="link-title">Books</span>
          </router-link>
        </li>-->
        <li class="nav-item">
          <router-link :to="{ name: 'people' }" class="nav-link">
            <i class="link-icon pi pi-user"></i>
            <span class="link-title">People</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'groups' }" class="nav-link">
            <i class="link-icon pi pi-users"></i>
            <span class="link-title">Groups</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'family' }" class="nav-link">
            <i class="link-icon pi pi-users"></i>
            <span class="link-title">Family</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'FollowUp' }" class="nav-link">
            <i class="link-icon pi pi-calendar"></i>
            <span class="link-title">Follow Up</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'expenses' }" class="nav-link">
            <i class="link-icon pi pi-dollar"></i>
            <span class="link-title">Expenses</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'attendance' }" class="nav-link">
            <i class="link-icon pi pi-list"></i>
            <span class="link-title">Attendance</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a
            id="contributions-collapse-btn"
            class="nav-link"
            data-toggle="collapse"
            href="#contributions"
            role="button"
            aria-expanded="false"
            aria-controls="users-roles"
          >
            <i class="link-icon pi pi-dollar"></i>
            <span class="link-title">Contributions</span>
            <i class="link-arrow pi pi-angle-down"></i>
          </a>
          <div class="collapse" id="contributions">
            <ul class="nav sub-menu">
              <li class="nav-item">
                <router-link :to="{ name: 'pledge' }" class="nav-link"
                  >Pledge</router-link
                >
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'Contributions' }" class="nav-link"
                  >All Contributions</router-link
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <a
            id="import-collapse-btn"
            class="nav-link"
            data-toggle="collapse"
            href="#import"
            role="button"
            aria-expanded="false"
            aria-controls="users-roles"
          >
            <i class="link-icon pi pi-cog"></i>
            <span class="link-title">Tools</span>
            <i class="link-arrow pi pi-angle-down"></i>
          </a>
          <div class="collapse" id="import">
            <ul class="nav sub-menu">
              <li class="nav-item">
                <router-link :to="{ name: 'AttendanceAdd' }" class="nav-link"
                  >Import Attendance</router-link
                >
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'expenseimport' }" class="nav-link"
                  >Import Expense</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'contributionsimport' }"
                  class="nav-link"
                  >Import Contributions</router-link
                >
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'peopleimport' }" class="nav-link"
                  >Import People</router-link
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'ReportIndex' }" class="nav-link">
            <i class="link-icon pi pi-chart-bar"></i>
            <span class="link-title">Reports</span>
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
            <i class="link-icon pi pi-user-plus"></i>
            <span class="link-title">Users & Roles</span>
            <i class="link-arrow pi pi-angle-down"></i>
          </a>
          <div class="collapse" id="users-roles">
            <ul class="nav sub-menu">
              <li class="nav-item">
                <router-link :to="{ name: 'user' }" class="nav-link"
                  >Users</router-link
                >
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'role' }" class="nav-link"
                  >Roles</router-link
                >
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
const logo = require("@assets/img/logo-long.png");

export default {
  name: "Sidebar",
  data() {
    return {
      logo,
    };
  },
  mounted() {
    new BSN.Collapse("#users-role-collapse-btn");
    new BSN.Collapse("#contributions-collapse-btn");
    new BSN.Collapse("#import-collapse-btn");
  },
};
</script>
