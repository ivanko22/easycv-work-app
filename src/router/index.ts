import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Function to check if the user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem('accessToken');
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "sign up" */ '@/pages/WizzardView.vue'),
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: () => import(/* webpackChunkName: "sign up" */ '@/pages/SignUp.vue')
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: () => import(/* webpackChunkName: "sign in" */ '@/pages/SignIn.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "logged in" */ '@/pages/WizzardView.vue'),
  },
  {
    path: '/logged-in',
    name: 'Logged In',
    component: () => import(/* webpackChunkName: "logged in" */ '@/pages/LoggedIn.vue'),
    meta: { requiresAuth: true }, // Add authentication requirement
  },
  {
    path: '/step-two',
    name: 'Step Two',
    component: () => import(/* webpackChunkName: "step two" */ '@/pages/StepTwo.vue'),
    meta: { requiresAuth: true }, // Add authentication requirement
  },
  {
    path: '/step-three',
    name: 'Step Three',
    component: () => import(/* webpackChunkName: "step three" */ '@/pages/StepThree.vue'),
    meta: { requiresAuth: true }, // Add authentication requirement
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/DashBoard.vue'),
    meta: { requiresAuth: true }, // Add authentication requirement
  },
  {
    path: '/edit-job',
    name: 'Edit Job',
    component: () => import(/* webpackChunkName: "edit job" */ '@/pages/EditJob.vue'),
    meta: { requiresAuth: true }, // Add authentication requirement
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Redirect to sign-in page if not authenticated
    next({ name: 'Sign In' });
  } else {
    next(); // Allow navigation
  }
});

export default router;
