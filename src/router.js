import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeComponent.vue';
import NotFound from './views/NotFoundComponent.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/car/:id', name: 'carDetails', component: () => import('./components/CarDetails.vue') },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
