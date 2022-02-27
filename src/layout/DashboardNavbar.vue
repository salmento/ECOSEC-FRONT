<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <form
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    ></form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <template v-slot:title>
            <div class="media align-items-center">
              <span class="avatar avatar-sm text-light rounded-circle">
                <i class="ni ni-circle-08"></i>
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm text-primary">{{ user }}</span>
              </div>
            </div>
          </template>
          <div class="dropdown-divider"></div>
          <router-link
            to="/login"
            class="dropdown-item text-primary"
            @click="logout()"
          >
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </router-link>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      user: "",
    };
  },
  mounted() {
   if (localStorage.accessToken) {
      this.user = localStorage.firstname + " " + localStorage.lastname;
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("accessToken");
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
