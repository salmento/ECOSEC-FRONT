import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Sms from "../views/Sms.vue";
import List from "../views/List.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Encomenda from "../views/Encomenda.vue";

const routes = [ 
  {
    path: "/",
    redirect: "/register",
    component: DashboardLayout,
    children: [
      {
        path: "/encomenda",
        name: "Encomenda",
        components: { default: Encomenda },
      },
      {
        path: "/notificar/:firstname/:lastname/:phoneNumber",
        name: "SMS",
        components: { default: Sms },
      },

      {
        path: "/list",
        name: "List",
        components: { default: List },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
      {
        path: "/entrega",
        name: "entrega",
        components: { default: Register },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
