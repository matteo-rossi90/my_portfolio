import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import Portfolio from "./pages/Portfolio.vue";
import About from "./pages/About.vue";
import ShowProject from "./pages/ShowProject.vue";
import Contacts from "./pages/Contacts.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/progetti',
            name: 'Portfolio',
            component: Portfolio
        },
        {
            path: '/chi-sono',
            name: 'About',
            component: About
        },
        {
            path: '/progetto/:id',
            name: 'ShowProject',
            component: ShowProject
        },
        {
            path: '/contatti',
            name: 'Contacts',
            component: Contacts
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, behavior: 'instant' };
    }
});
export { router };