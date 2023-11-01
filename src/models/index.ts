export type FetchedCountry = {
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	name: {
		common: string;
		official: string;
		nativeName: {};
	};
	capital: string[];
};

export class FetchQuestionsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'FetchQuestionsError';
	}
}

export type Country = {
	flags: {
		svg: string;
		alt: string;
	};
	name: string;
	capital: string;
};

export enum QuestionType {
	CAPITAL = 'CAPITAL',
	FLAG = 'FLAG',
}

export type Question = {
	type: QuestionType;
	title: string;
	correctAnswer: string;
	options: string[];
	country: Country;
};

export type UserAnswer = {
	userAnswer: string;
	correctAnswer: string;
	isCorrect: boolean;
};
