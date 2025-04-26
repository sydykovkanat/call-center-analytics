<template>
	<aside
		class="w-xs border-r min-h-screen border-gray-300 bg-white border-dashed p-4 space-y-6"
	>
		<router-link to="/" class="flex items-center gap-x-2">
			<img src="/logo.svg" class="size-10" alt="logo" />

			<div>
				<h5 class="text-lg leading-none">Аналитика</h5>

				<p class="text-sm text-gray-400 leading-none">
					Аналитика звонков колл-центр
				</p>
			</div>
		</router-link>

		<Nav />
	</aside>
</template>

<script setup>
import Nav from '@/shared/components/nav.vue';
</script>
