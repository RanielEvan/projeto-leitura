const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "inicio",
        component: () => import("pages/inicio"),
        meta: {
          title: "Início",
          icon: "home",
        },
      },

      {
        path: "praticar",
        component: () => import("pages/pratica"),
        meta: {
          title: "Praticar",
          icon: "start",
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
