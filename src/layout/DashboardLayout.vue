<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar short-title="Ecosec" title="Ecosec" class="bg-default sidebar">
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Registar',
            icon: 'ni ni-single-02 text-pink',
            path: '/register',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Notificar Cliente',
            icon: 'ni ni-time-alarm text-blue',
            path: '/notificar',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Consultar Cliente',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/list',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
