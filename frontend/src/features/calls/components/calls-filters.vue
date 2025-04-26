<template>
	<Card>
		<template #title> Фильтры </template>
		<template #content>
			<div class="grid grid-cols-4 gap-4">
				<DatePicker
					showIcon
					iconDisplay="input"
					selection-mode="range"
					placeholder="Выберите дату"
				/>

				<Select
					:options="STATUSES"
					option-label="label"
					option-value="id"
					placeholder="Выберите статус"
				/>

				<Select
					:options="CATEGORIES"
					option-label="label"
					option-value="id"
					placeholder="Выберите категорию"
				/>
			</div>
		</template>
	</Card>
</template>

<script setup>
import { CATEGORIES } from '@/shared/constants/categories.constants.js';
import { STATUSES } from '@/shared/constants/status.constants.js';
</script>

<style scoped></style>
