<template>
	<Card>
		<template #title>Управление пользователями</template>

		<template #content>
			<div class="flex items-center gap-x-4">
				<IconField>
					<InputIcon class="pi pi-search" />
					<InputText
						:value="search"
						@input="
							($event: Event) =>
								$emit(
									'update:search',
									($event.target as HTMLInputElement).value,
								)
						"
						placeholder="Поиск пользователя"
					/>
				</IconField>

				<UserCreateModal />
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import UserCreateModal from '@/features/users/components/user-create-modal.vue';

interface Props {
	search: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	'update:search': [value: string];
}>();
</script>
