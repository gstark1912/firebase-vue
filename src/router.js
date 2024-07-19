import { createRouter, createWebHistory } from "vue-router"
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import { useUserStore } from "./stores/userStore";

const requireAuth = async (to, from, next) => {
    const useStore = useUserStore();
    const { currentUser } = useStore;
    const user = await currentUser();
    if (user) {
        next();
    }
    else {
        next('/login')
    }
}

var routes = [
    {
        path: '/',
        component: HomeView,
        beforeEnter: requireAuth
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/register',
        component: RegisterView
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;