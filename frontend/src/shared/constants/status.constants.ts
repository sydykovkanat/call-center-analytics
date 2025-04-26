export const STATUSES = [
	{
		id: [],
		label: 'Все',
	},
	{
		id: 'completed',
		label: 'Завершённые',
	},
	{
		id: 'missed',
		label: 'Пропущенные',
	},
	{
		id: 'rejected',
		label: 'Отклонённые',
	},
];

export const getStatusLabel = (status: string) => {
	return STATUSES.find((item) => item.id === status)?.label || '';
};
