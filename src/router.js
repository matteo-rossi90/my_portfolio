import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import Portfolio from "./pages/Portfolio.vue";
import About from "./pages/About.vue";

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
        }
    ]
});
export { router };