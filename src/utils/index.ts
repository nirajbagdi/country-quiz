export const shuffleArray = <T>(arr: T[]) =>
	arr.sort(() => Math.random() - 0.5);
