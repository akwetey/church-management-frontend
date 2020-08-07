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
      {
        path: "role",
        name: "role",
        component: () => import("@views/roles/Index.vue"),
      },
      {
        path: "role/add",
        name: "roleadd",
        component: () => import("@views/roles/Add.vue"),
      },
      {
        path: "role/edit/:mask",
        name: "roleedit",
        component: () => import("@views/roles/Edit.vue"),
      },
      {
        path: "groups",
        name: "groups",
        component: () => import("@views/groups/Index.vue"),
      },
      {
        path: "groups/add",
        name: "groupadd",
        component: () => import("@views/groups/Add.vue"),
      },
      {
        path: "groups/edit/:mask",
        name: "groupedit",
        component: () => import("@views/groups/Edit.vue"),
      },
      {
        path: "people",
        name: "people",
        component: () => import("@views/people/Index.vue"),
      },
      {
        path: "person/add",
        name: "addperson",
        component: () => import("@views/people/Add.vue"),
      },
      {
        path: "person/edit/:mask",
        name: "personedit",
        component: () => import("@views/people/Edit.vue"),
      },
      {
        path: "family",
        name: "family",
        component: () => import("@views/family/Index.vue"),
      },
      {
        path: "family/add",
        name: "familyadd",
        component: () => import("@views/family/Add.vue"),
      },
      {
        path: "family/edit/:mask",
        name: "familyedit",
        component: () => import("@views/family/Edit.vue"),
      },
      {
        path: "follow-up",
        name: "FollowUp",
        component: () => import("@views/follow-up/Index.vue"),
      },
      {
        path: "follow-up/add",
        name: "FollowUpAdd",
        component: () => import("@views/follow-up/Add.vue"),
      },
      {
        path: "follow-up/:mask",
        name: "FollowUpEdit",
        component: () => import("@views/follow-up/Edit.vue"),
      },
      {
        path: "attendance",
        name: "attendance",
        component: () => import("@views/attendance/Index.vue"),
      },
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
            component: () => import("@views/contribution/covenant/Add.vue"),
          },
        ],
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
