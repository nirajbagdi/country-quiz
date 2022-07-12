import axios from 'axios';

import { Country, Question, FetchedData } from '../models';
import { API_URL, TOTAL_QUESTIONS } from '../constants';
import { shuffleArray } from '../utils';

export const fetchQuestions = async (): Promise<Question[]> => {
    const { data: fetchedData } = await axios.get(API_URL);

    const modifiedData = fetchedData.map((country: FetchedData) => ({
        name: country.name.common,
        capital: country.capital?.[0],
        flag: country.flags.svg
    }));

    const shuffledQuestions: Country[] = shuffleArray(modifiedData);

    return shuffledQuestions.slice(0, TOTAL_QUESTIONS).map(country => {
        let options = [...shuffledQuestions]
            .splice(Math.floor(Math.random() * shuffledQuestions.length), 3)
            .map(country => country.name);

        const countryData: Country = {
            name: country.name,
            capital: country.capital,
            flag: country.flag
        };

        options = shuffleArray([...options, countryData.name]);

        return {
            country: countryData,
            correctAnswer: countryData.name,
            options
        };
    });
};
