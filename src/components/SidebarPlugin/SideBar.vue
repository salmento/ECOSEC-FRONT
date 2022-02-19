<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <router-link class="navbar-brand text-light font-weight-bolder" to="/">
        <span class="display-2">{{ logo }}</span>
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="right">
            <template v-slot:title>
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <i class="ni ni-circle-08"></i>
                </span>
              </div>
            </template>
            <div class="dropdown-divider"></div>
            <span class="ml-5 text-sm text-primary">{{ user }}</span>
            <a href="/login" class="dropdown-item" @click="logout()">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link class="text-light" to="/">
                <span>{{ logo }}</span>
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
        <!--Divider-->
        <hr class="my-3" />
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";

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
    /*if (localStorage.accessToken) {
      this.user = localStorage.firstname + " " + localStorage.lastname;
    } else {
      this.$router.push("login");
    }*/
  },
  name: "sidebar",
  components: {
    NavbarToggleButton,
  },
  props: {
    logo: {
      type: String,
      default: "ECOSEC",
      description: "Sidebar app logo",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("accessToken");
    },
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },
  },
  beforeUnmount() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>

<style scoped>
@media (max-width: 767px) {
  .navbar-collapse {
    background-color: #627d99;
  }
}
</style>
