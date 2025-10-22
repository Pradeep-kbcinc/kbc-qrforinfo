import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import Layout from "@/layouts/default.vue";
import Login from "@/pages/login.vue";
import Dashboard from "@/components/Dashboard.vue";
import Properties from "@/components/Properties.vue";
import AddNewProperty from "@/components/AddNewProperty.vue";
import Settings from "@/components/Settings.vue"
import SavedProperties from "@/components/SavedProperties.vue";
import Messages from "@/components/Messages.vue";
import PropertyDetails from "@/components/PropertyDetails.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "LandingPage",
      component: Layout,
      children: [
        {
          path: "/home",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "/properties",
          name: "Properties",
          component: Properties,
        },
        {
          path: "/property/:id",
          name: "Property",
          component: PropertyDetails,
        },
        {
          path: "/saved",
          name: "Saved",
          component: SavedProperties,
        },
        {
          path: "/messages",
          name: "Messages",
          component: Messages,
        },
        {
          path: "/add-new-property",
          name: "AddNewProperty",
          component: AddNewProperty,
        },
        {
          path: "/settings",
          name: "Settings",
          component: Settings,
        },

      ],
    },
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/buy/properties",
      name: "BuyProperties",
      component: Properties,
    },
    {
      path: "/buy/property/:id",
      name: "BuyPropertyDetails",
      component: PropertyDetails,
    },
  ],
});

// async function routeGuard(to, from, next) {
//   const authStore = useAuthStore()
//   const isAuthenticated = authStore.isAuthenticated
//   if (isAuthenticated && !authStore.userDetails) {
//     try {
//       const response = localStorage.getItem('userDetails')
//       if (response) {
//         const res = JSON.parse(response)
//         authStore.userLoginVerify(res)
//       } else {
//         // console.log('not verified verifyUser 1')
//         // next({ name: 'PageNotFound' })
//         authStore.logout()
//         // authStore.userLoginVerify(undefined)
//         // console.log('not verified verifyUser')
//       }
//     } catch (e) {
//       next({ name: 'PageNotFound' })
//       authStore.logout()
//       console.log(e)
//     }
//   }

//   if (isAuthenticated && authStore.userDetails) {
//     if (to.meta.role == 'ALL') {
//       next()
//     } else if (authStore.userDetails.USER_ROLE.some((value) => value.USER_ROLE !== to.meta.role)) {
//       // Redirect to unauthorized page or some other route
//       next({ name: 'PageNotFound' })
//     } else {
//       next()
//     }
//   } else {
//     next({ name: 'Login' })
//   }
// }

// function checkLoggedInRouteGuard(to, from, next) {
//   const authStore = useAuthStore()
//   const isAuthenticated = authStore.isAuthenticated
//   if (isAuthenticated) {
//     next({ name: 'Home' })
//   } else {
//     next()
//   }
// }

export default router;
