export const useLoader = (timeout: number = 100, initial: boolean = false) => {
	let isLoading = $state(initial);
	let timoutId: number | null = $state(null);

	const start = () => {
		timoutId = window.setTimeout(() => {
			isLoading = true;
		}, timeout);
	};

	const stop = () => {
		if (timoutId) {
			window.clearTimeout(timoutId);
		}

		isLoading = false;
	};

	return {
		start,
		stop,
		get isLoading() {
			return isLoading;
		},
	};
};
