import { createRouter, createWebHistory } from 'vue-router';
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import Dashboard from './components/Dashboard.vue';
import NotFound from './components/NotFound.vue';
import store from './store';

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
            path: '/dashboard',
            component: Dashboard,
            meta: {
                requiredAuth: true,
            },
        },
        {
            path: '/:notfound(.*)',
            component: NotFound,
        },
    ],
});

router.beforeEach(function(to, _, next){
    if(to.meta.requiredAuth && !store.getters.isAuth){
        next('/login');
    }
    else{
        next();
    }
});

export default router;