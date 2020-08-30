export default [
  {
    path: "expense-import",
    name: "expenseimport",
    component: () => import("@views/tools/expense/ExpenseImport.vue"),
  },
  {
    path: "contributions-import",
    name: "contributionsimport",
    component: () => import("@views/tools/contribution/ContributionImport.vue"),
  },
  {
    path: "people-import",
    name: "peopleimport",
    component: () => import("@views/tools/people/PeopleImport.vue"),
  },
];
