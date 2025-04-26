<template>
	<main class="flex h-screen">
		<Sidebar />

		<div class="flex-1 p-4 overflow-auto">
			<router-view />
		</div>
	</main>
</template>

<script setup lang="ts">
import Sidebar from '@/shared/components/sidebar.vue';
</script>
