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
      {
        path: "user",
        name: "user",
        component: () => import("@views/users/Index.vue"),
      },
      {
        path: "user/add",
        name: "adduser",
        component: () => import("@views/users/Add.vue"),
      },
      {
        path: "user/edit/:mask",
        name: "useredit",
        component: () => import("@views/users/Edit.vue"),
      },
    ],
  },
  {
    path: "/store",
    component: () => import("@layouts/Store.vue"),
    children: [
      {
        path: "books",
        name: "StoreBooks",
        component: () => import("@views/store/Books.vue"),
      },
      {
        path: "book/:token",
        name: "StoreBook",
        component: () => import("@views/store/Book.vue"),
      },
    ],
  },
];
