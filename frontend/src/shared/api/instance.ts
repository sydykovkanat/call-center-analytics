import axios from 'axios';

import { API_URL } from '@/shared/constants/api.constants';

import { useLoginStore } from '@/stores';

export const instance = axios.create({
	baseURL: API_URL,
});

export const localInstance = axios.create();

instance.interceptors.request.use(
	(config) => {
		const user = useLoginStore().user;

		if (user?.token) {
			config.headers.Authorization = `Bearer ${user.token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
