export default [
  {
    path: "expenses",
    name: "expenses",
    component: () => import("@views/expenses/Index.vue"),
  },
  {
    path: "expenses/add",
    name: "expensesadd",
    component: () => import("@views/expenses/Add.vue"),
  },
  {
    path: "expenses/edit/:mask",
    name: "expensesedit",
    component: () => import("@views/expenses/Edit.vue"),
  },
];
