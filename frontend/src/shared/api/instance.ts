import axios from 'axios';

import { API_URL } from '@/shared/constants/api.constants';

export const instance = axios.create({
	baseURL: API_URL,
});

export const localInstance = axios.create();
