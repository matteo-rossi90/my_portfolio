import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';

const routes = [

    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,

});

export default router;
