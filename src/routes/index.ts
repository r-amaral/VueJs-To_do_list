import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/Login/Login.vue") },
  {
    path: "/register",
    component: () => import("../views/Register/Register.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("../views/Dashboard/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
