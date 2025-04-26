<template>
	<Loader v-if="isUsersLoading" />

	<div class="space-y-6" v-else-if="users">
		<UsersFilters :search="search" @update:search="search = $event" />

		<UsersTable :users="filteredUsers" />
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Loader from '@/shared/components/loader.vue';

import UsersFilters from '@/features/users/components/users-filters.vue';
import UsersTable from '@/features/users/components/users-table.vue';
import { useGetUsers } from '@/features/users/hooks';

const { users, isUsersLoading } = useGetUsers();

const search = ref('');

const filteredUsers = computed(() => {
	if (!users.value) return [];

	if (!search.value) return users.value;

	const searchLower = search.value.toLowerCase();

	return users.value.filter((user) => {
		const name = user.displayName ? user.displayName.toLowerCase() : '';
		const email = user.email ? user.email.toLowerCase() : '';
		const role = user.role ? user.role.toLowerCase() : '';

		return (
			name.includes(searchLower) ||
			email.includes(searchLower) ||
			role.includes(searchLower)
		);
	});
});
</script>
