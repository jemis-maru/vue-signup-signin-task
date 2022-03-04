import { createRouter, createWebHistory } from 'vue-router';
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import NotFound from './components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/register',
        },
        {
            path: '/register',
            component: Signup,
        },
        {
            path: '/login',
            component: Signin,
        },
        {
            path: '/:notfound(.*)',
            component: NotFound,
        },
    ],
});

export default router;