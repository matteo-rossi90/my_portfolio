import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import ProjectList from '../pages/partials/ProjectList.vue';

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
        path: '/dashboard/progetti',
        name: 'ProjectList',
        component: ProjectList
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
