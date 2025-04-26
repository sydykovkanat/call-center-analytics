export const formatDuration = (durationInSeconds: number) => {
	const minutes = Math.floor(durationInSeconds / 60);
	const seconds = Math.floor(durationInSeconds % 60);
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
