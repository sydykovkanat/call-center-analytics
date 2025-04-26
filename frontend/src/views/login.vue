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
import LoginForm from '@/features/login/components/LoginForm.vue';
import type { ILoginMutation } from '@/features/login/types';

const handleLoginSubmit = (formData: ILoginMutation) => {
	console.log('Получены данные из формы:', formData);
};
</script>
