import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
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
import Signup from "@/components/Signup.vue";
import { useAuthStore } from '@/stores/app'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          beforeEnter: routeGuard,
        },
        {
          path: "/properties",
          name: "Properties",
          component: Properties,
          beforeEnter: routeGuard,
        },
        {
          path: "/property/:id",
          name: "Property",
          component: PropertyDetails,
          beforeEnter: routeGuard,
        },
        {
          path: "/saved",
          name: "Saved",
          component: SavedProperties,
          beforeEnter: routeGuard,
        },
        {
          path: "/messages",
          name: "Messages",
          component: Messages,
          beforeEnter: routeGuard,
        },
        {
          path: "/add-new-property/:id?",
          name: "AddNewProperty",
          component: AddNewProperty,
          beforeEnter: routeGuard,
        },
        {
          path: "/settings",
          name: "Settings",
          component: Settings,
          beforeEnter: routeGuard,
        },

      ],
    },
    {
      path: '/',
      redirect: '/buy/properties', // 👈 redirect root to this
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: checkLoggedInRouteGuard
    },
    {
      path: "/404",
      name: "PageNotFound",
      component: Login,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: Signup,
      beforeEnter: checkLoggedInRouteGuard
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

async function routeGuard(to, from, next) {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  if (isAuthenticated && authStore.userDetails) {
    next()
  }else {
    next({ name: 'Login' })
  }
}

function checkLoggedInRouteGuard(to, from, next) {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  if (isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
}

export default router;
