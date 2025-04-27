<template>
	<span @click="visible = true">
		<slot />
	</span>

	<Dialog
		v-model:visible="visible"
		modal
		header="Редактировать пользователя"
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

				<Button type="submit" label="Сохранить" severity="primary" />
			</div>
		</Form>
	</Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import { ROLES } from '@/shared/constants/roles.constants';

import { useEditUser } from '@/features/users/hooks';

const { editUser } = useEditUser();

const visible = ref(false);

const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
});

const initialValues = reactive({
	displayName: props.user.displayName || '',
	email: props.user.email || '',
	role: props.user.role || 'USER',
});

const resolver = ({
	values,
}: {
	values: {
		displayName: string;
		email: string;
		role: string;
	};
}) => {
	const errors: {
		[key: string]: {
			message: string;
		}[];
	} = {};

	if (!values.displayName) {
		errors.displayName = [{ message: 'Введите имя пользователя' }];
	}

	if (!values.email) {
		errors.email = [{ message: 'Введите адрес электронной почты' }];
	} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
		errors.email = [{ message: 'Некорректный формат электронной почты' }];
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

async function onFormSubmit({
	valid,
	values,
}: {
	valid: boolean;
	values: {
		displayName: string;
		email: string;
		role: string;
	};
}) {
	if (!valid) {
		return;
	}

	try {
		editUser({
			userId: props.user.id,
			data: values,
		});

		visible.value = false;
	} catch (error) {
		console.error('Ошибка при редактировании пользователя:', error);
	}
}
</script>
