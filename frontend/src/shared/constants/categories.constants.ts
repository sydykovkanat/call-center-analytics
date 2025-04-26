export const CATEGORIES = [
	{
		id: [],
		label: 'Все',
	},
	{
		id: 'billing',
		label: 'Billing',
	},
	{
		id: 'technical',
		label: 'Technical',
	},
	{
		id: 'general',
		label: 'General',
	},
];

export const getCategoryLabel = (category: string) => {
	return CATEGORIES.find((item) => item.id === category)?.label || '';
};
