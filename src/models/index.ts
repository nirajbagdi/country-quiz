export type Country = {
    name: string;
    capital: string;
    flag: string;
};

export type Question = {
    country: Country;
    correctAnswer: string;
    options: string[];
};

export type UserAnswer = {
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
};

export enum QuestionTypes {
    CAPITAL = 'capital',
    FLAG = 'flag'
}

export type FetchedData = {
    name: {
        common: string;
        official: string;
        nativeName: {};
    };
    flags: {
        png: string;
        svg: string;
    };
    capital: string[];
};
