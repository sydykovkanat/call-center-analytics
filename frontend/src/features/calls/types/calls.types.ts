export interface ICall {
	id: string;
	caller_number: string;
	receiver_number: string;
	start_time: string;
	end_time: string;
	status: 'completed' | 'missed' | 'rejected';
	agent_id: string;
	category: 'billing' | 'technical' | 'general';
	priority: number;
}

export interface ICallsFilters {
	agentId?: string;
	startDate: Date | null;
	endDate: Date | null;
	statuses: string[];
	categories: string[];
}
