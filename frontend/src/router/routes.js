import { appGuard } from "./appguard";

const routes = [
  {
    path: "/",
    redirect: "/inicio",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "inicio",
        path: "/inicio",
        component: () => import("pages/inicio"),
        beforeEnter: appGuard,
        meta: {
          title: "Início",
          icon: "home",
        },
      },

      {
        name: "pratica",
        path: "/praticar",
        component: () => import("pages/pratica"),
        beforeEnter: appGuard,
        meta: {
          title: "Praticar",
          icon: "start",
        },
      },

      {
        name: "relatorio",
        path: "/relatorio",
        component: () => import("pages/relatorio"),
        beforeEnter: appGuard,
        meta: {
          title: "Relatorio",
          icon: "chart",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
