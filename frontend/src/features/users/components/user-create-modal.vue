<template>
	<Button label="Добавить" @click="visible = true" icon="pi pi-user-plus" />

	<Dialog
		v-model:visible="visible"
		modal
		header="Добавить пользователя"
		class="w-lg"
	>
		<Form
			v-slot="$form"
			:initialValues="initialValues"
			:resolver="resolver"
			@submit="onFormSubmit"
			class="space-y-6"
		>
			<div class="space-y-4">
				<div>
					<InputText
						name="displayName"
						type="text"
						placeholder="Имя"
						class="w-full"
					/>
					<Message
						v-if="$form.displayName?.invalid"
						severity="error"
						size="small"
						variant="simple"
					>
						{{ $form.displayName.error?.message }}
					</Message>
				</div>

				<div>
					<InputText
						name="email"
						type="email"
						placeholder="example@mail.com"
						class="w-full"
					/>
					<Message
						v-if="$form.email?.invalid"
						severity="error"
						size="small"
						variant="simple"
					>
						{{ $form.email.error?.message }}
					</Message>
				</div>

				<div>
					<InputText
						name="password"
						type="password"
						placeholder="Пароль"
						class="w-full"
					/>
					<Message
						v-if="$form.password?.invalid"
						severity="error"
						size="small"
						variant="simple"
					>
						{{ $form.password.error?.message }}
					</Message>
				</div>

				<div>
					<Select
						name="role"
						class="w-full"
						:options="ROLES"
						option-label="label"
						option-value="value"
					/>
					<Message
						v-if="$form.role?.invalid"
						severity="error"
						size="small"
						variant="simple"
					>
						{{ $form.role.error?.message }}
					</Message>
				</div>
			</div>

			<div class="flex justify-end gap-2 mt-6">
				<Button
					type="button"
					label="Отменить"
					severity="secondary"
					@click="handleCancel"
				/>

				<Button type="submit" label="Создать" severity="primary" />
			</div>
		</Form>
	</Dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';

import { ROLES } from '@/shared/constants/roles.constants.js';

import { useCreateUser } from '@/features/users/hooks/index.js';

const { createUser } = useCreateUser();
const visible = ref(false);

const initialValues = reactive({
	displayName: '',
	email: '',
	password: '',
	role: 'USER',
});

const resolver = ({ values }) => {
	const errors = {};

	if (!values.displayName) {
		errors.displayName = [{ message: 'Введите имя пользователя' }];
	}

	if (!values.email) {
		errors.email = [{ message: 'Введите адрес электронной почты' }];
	} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
		errors.email = [{ message: 'Некорректный формат электронной почты' }];
	}

	if (!values.password) {
		errors.password = [{ message: 'Введите пароль' }];
	} else if (values.password.length < 6) {
		errors.password = [
			{ message: 'Пароль должен содержать минимум 6 символов' },
		];
	}

	if (!values.role) {
		errors.role = [{ message: 'Выберите роль пользователя' }];
	}

	return {
		values,
		errors,
	};
};

function handleCancel() {
	visible.value = false;
}

async function onFormSubmit({ valid, values }) {
	if (!valid) {
		return;
	}

	try {
		await createUser({
			displayName: values.displayName,
			email: values.email,
			password: values.password,
			role: values.role,
		});

		visible.value = false;
	} catch (error) {
		console.error('Ошибка при создании пользователя:', error);
		alert('Произошла ошибка при создании пользователя.');
	}
}
</script>
