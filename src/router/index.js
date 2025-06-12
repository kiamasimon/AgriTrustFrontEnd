import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminLayout from '../components/layouts/farmer/AdminLayout.vue'
import { useAuthStore } from '../store/auth'
import LandRegistration from "@/views/farmer/LandRegistration.vue";
import LandParcels from "@/views/farmer/LandParcels.vue";
import LandVerification from "@/views/admin/LandVerification.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { requiresGuest: true },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: AdminLayout,
        meta: { requiresAuth: true },
        children: [
            {
              path: '',
              name: 'DashboardHome',
              component: Dashboard
            },
            {
              path: 'list/land',
              name: 'DashboardHome',
              component: Dashboard
            },
            {
              path: 'register/land',
              name: 'RegisterLand',
              component: LandRegistration,
            },
            {
                path: 'land/parcels',
                name: 'LandParcels',
                component: LandParcels,
            },
            {
                path: 'land/verification/:id',
                name: 'LandVerification',
                component: LandVerification,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' })
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next({ name: 'dashboard' })
    } else {
        // If the route doesn't require auth or the user is authenticated
        if (authStore.isAuthenticated && !authStore.user) {
            await authStore.fetchUser()
        }
        next()
    }
})

export default router