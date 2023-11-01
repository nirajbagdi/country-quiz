import { useState, useEffect } from 'react';

import { Card, Layout, Quiz, Results, Option } from 'components';
import { fetchQuestions } from 'api';
import { Question, UserAnswer, FetchQuestionsError, QuestionType } from 'models';
import { QUESTIONS_PER_SET } from 'constants/index';

const App = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
	const [questionType, setQuestionType] = useState<QuestionType | null>(null);
	const [fetchError, setFetchError] = useState<FetchQuestionsError | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [questionIdx, setQuestionIdx] = useState(0);
	const [score, setScore] = useState(0);

	const currentQuestion = questions[questionIdx];
	const hasAnswered = questionIdx === userAnswers.length - 1;
	const hasReachedEnd = questionIdx === QUESTIONS_PER_SET;

	useEffect(() => {
		if (questionType !== null) loadQuestions(questionType);
	}, [questionType]);

	const loadQuestions = async (type: QuestionType) => {
		setIsLoading(true);

		try {
			const questions = await fetchQuestions(type);
			setQuestions(questions);
		} catch (error) {
			setFetchError(error as FetchQuestionsError);
		}

		setIsLoading(false);
		setUserAnswers([]);
		setQuestionIdx(0);
		setScore(0);
	};

	const handleAnswer = (userAnswer: string) => {
		const { correctAnswer } = currentQuestion;
		const isCorrect = userAnswer === correctAnswer;

		const userAnswerObj: UserAnswer = { userAnswer, correctAnswer, isCorrect };
		setUserAnswers(prevAnswers => [...prevAnswers, userAnswerObj]);

		if (isCorrect) setScore(score => score + 1);
	};

	const handleNextQuestion = () => {
		setQuestionIdx(idx => idx + 1);
	};

	const quizContentJSX = (
		<Quiz
			question={currentQuestion}
			onAnswer={handleAnswer}
			hasAnswered={hasAnswered}
			userAnswer={userAnswers[questionIdx]}
			onNextQuestion={handleNextQuestion}
		/>
	);

	const resultsContentJSX = (
		<Results
			score={score}
			onLoadQuestions={() => loadQuestions(questionType || QuestionType.CAPITAL)}
		/>
	);

	const errorContentJSX = (
		<Card>
			<p className="text-center">{fetchError?.message}</p>
		</Card>
	);

	const loadingContentJSX = (
		<Card>
			<p className="text-center">Loading...</p>
		</Card>
	);

	return (
		<Layout>
			{!questionType && (
				<Card>
					<Option
						name="Capital Quiz"
						onClick={() => setQuestionType(QuestionType.CAPITAL)}
					/>
					<Option name="Flag Quiz" onClick={() => setQuestionType(QuestionType.FLAG)} />
				</Card>
			)}

			{isLoading && !currentQuestion && loadingContentJSX}
			{!isLoading && !currentQuestion && fetchError && errorContentJSX}
			{!isLoading && currentQuestion && !hasReachedEnd && quizContentJSX}
			{!isLoading && hasReachedEnd && resultsContentJSX}
		</Layout>
	);
};

export default App;
