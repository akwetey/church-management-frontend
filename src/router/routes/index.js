import reportRoutes from "./report";
import contributionRoutes from "./contribution";
import expenseRoutes from "./expense";
import pledgeRoutes from "./pledge";
import importRoutes from "./imports";

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
        path: "person/detail/:mask",
        name: "PersonDetail",
        component: () => import("@views/people/detail/Index.vue"),
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
        path: "attendance/add",
        name: "AttendanceAdd",
        component: () => import("@views/attendance/import/Index.vue"),
      },
      {
        path: "attendance/:mask",
        name: "attendanceEdit",
        component: () => import("@views/attendance/edit/Index.vue"),
      },
      ...pledgeRoutes,
      ...expenseRoutes,
      ...contributionRoutes,
      ...reportRoutes,
      ...importRoutes,
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
