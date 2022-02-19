<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar short-title="Ecosec" title="Ecosec" class="bg-default sidebar">
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Consultar Cliente',
            icon: 'fa fa-address-card text-pink',
            path: '/client',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Promoções',
            icon: 'ni ni-satisfied text-blue',
            path: '/promotion',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Relatorio',
            icon: 'ni ni-single-copy-04 text-yellow',
            path: '/report',
          }"
        />
         <sidebar-item
          :link="{
            name: 'Utilizadores',
            icon: 'ni ni-single-02 text-success',
            path: '/user',
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
