export default [
  {
    path: "reports",
    component: () => import("@layouts/Report.vue"),
    children: [
      {
        path: "/",
        name: "ReportIndex",
        component: () => import("@views/report/Index.vue"),
      },
      {
        path: "attendance",
        name: "ReportAttendance",
        component: () => import("@views/report/attendance/Index.vue"),
      },
      {
        path: "expenses",
        name: "ReportExpense",
        component: () => import("@views/report/expense/Index.vue"),
      },
    ],
  },
];
