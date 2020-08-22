export default [
  {
    path: "pledge",
    name: "pledge",
    component: () => import("@views/pledge/Index.vue"),
  },
  {
    path: "pledge/add",
    name: "pledgeadd",
    component: () => import("@views/pledge/Add.vue"),
  },
  {
    path: "pledge/edit/:mask",
    name: "pledgeedit",
    component: () => import("@views/pledge/Edit.vue"),
  },
];
