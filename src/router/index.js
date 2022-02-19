import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import DashboardAdmin from "@/layout/DashboardAdmin";

import Sms from "../views/Sms.vue";
import Client from "../views/Client.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Encomenda from "../views/Encomenda.vue";
import Listorder from "../views/Listorder.vue";
import Deliver from "../views/Deliver.vue";
import User from "../views/User.vue";

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
        path: "/notificar",
        //path: "/notificar/:firstname/:lastname/:phoneNumber",
        name: "SMS",
        components: { default: Sms },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
      {
        path: "/listorder",
        name: "listorder",
        components: { default: Listorder },
      },
      {
        path: "/deliver",
        name: "deliver",
        components: { default: Deliver },
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
  {
    path: "/",
    redirect: "client",
    component: DashboardAdmin,
    children: [
      {
        path: "/report",
        name:"report",
        components: { default: Login },
      },
      {
        path: "/promotion",
        name: "promotion",
        components: { default: Login },
      },
      {
        path: "/client",
        name: "client",
        components: { default: Client },
      },
      {
        path: "/user",
        name: "user",
        components: { default: User },
      }
      
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
