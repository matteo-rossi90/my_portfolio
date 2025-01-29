import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import ProjectList from '../pages/projects/ProjectList.vue';
import CreateProject from '../pages/projects/CreateProject.vue';
import Profile from '../pages/Profile.vue';

const routes = [

    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true}
    },
    {
        path: '/dashboard/profilo-utente',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard/progetti',
        name: 'ProjectList',
        component: ProjectList,
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard/nuovo-progetto',
        name: 'CreateProject',
        component: CreateProject,
        meta: { requiresAuth: true }
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
