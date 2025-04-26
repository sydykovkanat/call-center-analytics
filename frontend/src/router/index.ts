import { createRouter, createWebHistory } from 'vue-router';

import { useLoginStore } from '@/stores/login.store';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/shared/components/layout.vue'),
			meta: { requiresAuth: true },
			children: [
				{
					path: '/',
					name: 'home',
					component: () => import('@/views/dashboard.vue'),
				},
				{
					path: '/detailing',
					name: 'detailing',
					component: () => import('@/views/detailing.vue'),
				},
				{
					path: '/settings',
					name: 'settings',
					component: () => import('@/views/settings.vue'),
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login.vue'),
			meta: { requiresAuth: false },
		},
	],
});
router.beforeEach((to, _from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const loginStore = useLoginStore();
	const isAuthenticated = !!loginStore.user;

	if (requiresAuth && !isAuthenticated) {
		next('/login');
	} else if (isAuthenticated && to.fullPath === '/login') {
		next('/');
	} else {
		next();
	}
});

export default router;
