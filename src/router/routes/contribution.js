export default [
  {
    path: "contributions",
    component: () => import("@layouts/Finance.vue"),
    children: [
      {
        path: "/",
        name: "Contributions",
        component: () => import("@views/contribution/Index.vue"),
      },
      {
        path: "covenant-partner/add",
        name: "covenantadd",
        component: () => import("@views/contribution/covenant/Add.vue"),
      },
      {
        path: "covenant-partner/:mask",
        name: "covenantedit",
        component: () => import("@views/contribution/covenant/Edit.vue"),
      },
      {
        path: "busing/add",
        name: "busingadd",
        component: () => import("@views/contribution/busing/Add.vue"),
      },
      {
        path: "busing/:mask",
        name: "busingedit",
        component: () => import("@views/contribution/busing/Edit.vue"),
      },
      {
        path: "tithe/add",
        name: "TitheAdd",
        component: () => import("@views/contribution/tithe/Add.vue"),
      },
      {
        path: "tithe/:mask",
        name: "TitheEdit",
        component: () => import("@views/contribution/tithe/Edit.vue"),
      },
      {
        path: "group/add",
        name: "addgroup",
        component: () => import("@views/contribution/groups/Add.vue"),
      },
      {
        path: "group/:mask",
        name: "groupEdit",
        component: () => import("@views/contribution/groups/Edit.vue"),
      },
      {
        path: "welfare/add",
        name: "addwelfare",
        component: () => import("@views/contribution/welfare/Add.vue"),
      },
      {
        path: "welfare/:mask",
        name: "welfareedit",
        component: () => import("@views/contribution/welfare/Edit.vue"),
      },
      {
        path: "pledge/add",
        name: "pledgeAdd",
        component: () => import("@views/contribution/pledge/Add.vue"),
      },
      {
        path: "pledge/:mask",
        name: "pledgeEdit",
        component: () => import("@views/contribution/pledge/Edit.vue"),
      },
      {
        path: "general/add",
        name: "generalAdd",
        component: () => import("@views/contribution/general/Add.vue"),
      },
      {
        path: "general/:mask",
        name: "generalEdit",
        component: () => import("@views/contribution/general/Edit.vue"),
      },
    ],
  },
];
