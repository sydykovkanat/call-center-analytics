<template>
	<main class="flex">
		<Sidebar />

		<div class="flex-1 p-4">
			<router-view />
		</div>
	</main>
</template>

<script setup lang="ts">
import Sidebar from '@/shared/components/sidebar.vue';
</script>
