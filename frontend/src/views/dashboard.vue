<template>
	<CallsFilters />
</template>

<script setup lang="ts">
import CallsFilters from '@/features/calls/components/calls-filters.vue';
import { useGetCalls } from '@/features/calls/hooks';

const { calls, isCallsLoading } = useGetCalls();
</script>
