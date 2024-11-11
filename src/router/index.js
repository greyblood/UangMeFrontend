import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Dashboard from '@/components/Dashboard.vue';
import LenderInvestment from '@/components/Investment.vue';
import InvestmentHistory from '@/components/InvestmentHistory.vue';

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/invest', component: LenderInvestment },
    { path: '/investment-history', component: InvestmentHistory },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
