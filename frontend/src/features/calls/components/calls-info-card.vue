<template>
	<Card>
		<template #title>
			<p class="font-normal text-gray-500 text-base">
				{{ title }}
			</p>
		</template>

		<template #content>
			<h4 class="text-3xl font-semibold">
				{{ value }}
			</h4>
		</template>
	</Card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	value: {
		type: [String, Number],
		required: true,
	},
});
</script>

<style scoped></style>
