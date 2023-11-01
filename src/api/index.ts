import axios from 'axios';

import { shuffleArray } from 'utils';
import { API_URL, QUESTIONS_PER_SET } from 'constants/index';
import { Country, FetchedCountry, Question, QuestionType, FetchQuestionsError } from 'models';

const getOptions = (countries: Country[], country: Country) => {
	const randomOptions = [...countries]
		.splice(Math.floor(Math.random() * countries.length - 3), 3)
		.map(c => c.name);

	return shuffleArray([...randomOptions, country.name]);
};

const getTitle = (type: QuestionType, country: Country) => {
	switch (type) {
		case QuestionType.CAPITAL:
			return `${country.capital} is the capital of`;
		case QuestionType.FLAG:
			return 'What country does this flag belong to?';
		default:
			return '';
	}
};

const createQuestion = (type: QuestionType, country: Country, countries: Country[]): Question => {
	const options = getOptions(countries, country);
	const title = getTitle(type, country);
	const correctAnswer = country.name;

	return { type, title, correctAnswer, options, country };
};

export const fetchQuestions = async (questionType = QuestionType.CAPITAL): Promise<Question[]> => {
	try {
		const { data: fetchedCountries } = await axios.get(API_URL);

		const countriesData: Country[] = fetchedCountries.map((country: FetchedCountry) => ({
			flags: {
				svg: country.flags.svg,
				alt: country.flags.alt,
			},
			name: country.name.common,
			capital: country.capital?.[0] || '',
		}));

		const shuffledCountriesData = shuffleArray(countriesData);

		return shuffledCountriesData
			.slice(0, QUESTIONS_PER_SET)
			.map(country => createQuestion(questionType, country, shuffledCountriesData));
	} catch (error) {
		console.error('Error fetching questions: ', error);
		throw new FetchQuestionsError('Failed to fetch questions. Please try again later.');
	}
};
