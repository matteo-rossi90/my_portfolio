import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import Portfolio from "./pages/Portfolio.vue";
import About from "./pages/About.vue";
import ShowProject from "./pages/ShowProject.vue";

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
    ]
});
export { router };