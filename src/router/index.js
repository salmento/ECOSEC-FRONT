import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Sms from "../views/Sms.vue";
import List from "../views/List.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    redirect: "/register",
    component: DashboardLayout,
    children: [
      {
        path: "/notificar",
        name: "Sms",
        components: { default: Sms },
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
