<template>
	<div class="flex items-center justify-center min-h-screen">
		<div class="space-y-6 border border-gray-200 bg-white p-10 rounded-2xl">
			<div class="flex items-center gap-x-4">
				<img src="/logo.svg" alt="Logo" class="size-14" />

				<div>
					<h1 class="text-lg font-medium">Вход в систему</h1>
					<p class="text-gray-400">Аналитика звонков колл-центра</p>
				</div>
			</div>

			<div>
				<LoginForm @submit="handleLoginSubmit" />
			</div>

			<div>
				<p class="text-gray-400 text-center text-sm">
					© 2025 Мобильный оператор "O!"
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { isAxiosError } from 'axios';
import { isArray } from 'chart.js/helpers';
import { useToast } from 'primevue';
import { useRouter } from 'vue-router';

import LoginForm from '@/features/login/components/LoginForm.vue';
import type { ILoginMutation } from '@/features/login/types';
import { useLoginStore } from '@/stores';

const loginStore = useLoginStore();

const { push } = useRouter();
const { add } = useToast();

const handleLoginSubmit = async (formData: ILoginMutation) => {
	try {
		await loginStore.login(formData);
		await push('/');
	} catch (err) {
		if (isAxiosError(err) && err.response) {
			add({
				severity: 'error',
				summary: 'Ошибка',
				detail: isArray(err.response.data.message)
					? err.response.data.message.join(', ')
					: err.response.data.message,
				life: 3000,
			});
		} else {
			add({
				severity: 'error',
				summary: 'Ошибка',
				detail: 'Неизвестная ошибка. Попробуйте позже.',
				life: 3000,
			});
		}
	}
};
</script>
