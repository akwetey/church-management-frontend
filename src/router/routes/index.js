export default [
  {
    path: "/",
    component: () => import("@layouts/Auth.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@views/auth/Index.vue"),
      },
      {
        path: "password-reset",
        name: "PasswordReset",
        component: () => import("@views/auth/PasswordReset.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@layouts/Main.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@views/dashboard/Index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "books",
        name: "Books",
        component: () => import("@views/books/Index.vue"),
      },
      {
        path: "books/add",
        name: "BooksAdd",
        component: () => import("@views/books/Add.vue"),
      },
      {
        path: "books/edit/:mask",
        name: "BooksEdit",
        component: () => import("@views/books/Edit.vue"),
      },
    ],
  },
];
