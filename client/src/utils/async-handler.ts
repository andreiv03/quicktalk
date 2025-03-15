export function asyncHandler<T extends unknown[], R>(
	fn: (...args: T) => Promise<R>,
	shouldThrow: boolean = false,
): (...args: T) => Promise<R | void> {
	return async (...args: T): Promise<R | void> => {
		try {
			return await fn(...args);
		} catch (error) {
			console.error("Error:", error instanceof Error ? error.message : String(error));
			if (shouldThrow) {
				throw error;
			}
		}
	};
}
