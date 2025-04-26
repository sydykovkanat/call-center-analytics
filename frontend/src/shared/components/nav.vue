<template>
	<div>
		<ul class="space-y-4">
			<li v-for="item in items" :key="item.label">
				<router-link :to="item.to">
					<Button
						:severity="item.to === route.path ? undefined : 'secondary'"
						class="w-full justify-start!"
					>
						<i :class="item.icon"></i>
						<span>{{ item.label }}</span>
					</Button>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const items = [
	{
		label: 'Дашборд',
		icon: 'pi pi-fw pi-home',
		to: '/',
	},
	{
		label: 'Детализация',
		icon: 'pi pi-fw pi-table',
		to: '/detailing',
	},
];
</script>
