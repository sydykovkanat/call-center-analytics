<template>
	<Form
		v-slot="$form"
		:initialValues
		:resolver
		@submit="onFormSubmit"
		class="space-y-4"
	>
		<div>
			<InputText
				name="email"
				type="text"
				placeholder="example@mail.com"
				fluid
			/>
			<Message
				v-if="$form.email?.invalid"
				severity="error"
				size="small"
				variant="simple"
				>{{ $form.email.error?.message }}</Message
			>
		</div>

		<div>
			<InputText name="password" type="password" placeholder="Пароль" fluid />
			<Message
				v-if="$form.password?.invalid"
				severity="error"
				size="small"
				variant="simple"
				>{{ $form.password.error?.message }}</Message
			>
		</div>

		<Button type="submit" label="Войти" class="w-full" />
	</Form>
</template>

<script setup>
import { reactive } from 'vue';

const initialValues = reactive({
	email: '',
	password: '',
});

const resolver = ({ values }) => {
	const errors = {};

	if (!values.email) {
		errors.email = [{ message: 'Введите адрес электронной почты' }];
	}

	if (!values.password) {
		errors.password = [{ message: 'Введите пароль' }];
	}

	return {
		values,
		errors,
	};
};

const emit = defineEmits(['submit']);

const onFormSubmit = ({ valid, values }) => {
	if (valid) {
		emit('submit', values);
	}
};
</script>
