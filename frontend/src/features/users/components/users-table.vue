<template>
	<DataTable
		:value="users"
		tableStyle="min-width: 50rem"
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[5, 10, 20, 50]"
	>
		<Column field="displayName" header="Имя" :sortable="true" />

		<Column field="email" header="Почта" />

		<Column field="role" header="Роль" />

		<Column class="w-24 !text-end">
			<template #body="{ data }">
				<div class="flex items-center gap-x-4">
					<Button
						icon="pi pi-trash"
						@click="deleteUser(data.id)"
						severity="secondary"
						rounded
					/>

					<UserEditModal :user="data">
						<Button icon="pi pi-pencil" severity="secondary" rounded />
					</UserEditModal>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import UserEditModal from '@/features/users/components/user-edit-modal.vue';
import { useDeleteUser } from '@/features/users/hooks';

const { deleteUser } = useDeleteUser();

const props = defineProps({
	users: {
		type: Array,
		required: true,
		default: () => [],
	},
});
</script>
