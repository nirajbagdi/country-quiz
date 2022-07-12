import React, { useState, useEffect } from 'react';

import { fetchQuestions } from './api';
import { Question, QuestionTypes, UserAnswer } from './models';
import { TOTAL_QUESTIONS } from './constants';

import { Card, Layout, QuizCard, ResultsCard } from './components';

const App = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [questionType, setQuestionType] = useState(QuestionTypes.CAPITAL);
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState(0);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[number];

    const hasAnswered = userAnswers.length === number + 1;
    const hasReachedEnd =
        userAnswers.length === TOTAL_QUESTIONS && number !== TOTAL_QUESTIONS - 1;

    useEffect(() => {
        (async () => await loadQuestions())();
    }, []);

    const loadQuestions = async () => {
        setLoading(true);

        const fetchedQuestions = await fetchQuestions();
        setQuestions(fetchedQuestions);

        setLoading(false);
        setUserAnswers([]);
        setScore(0);
        setNumber(0);
        setQuestionType(QuestionTypes.CAPITAL);
    };

    const handleAnswer = (event: React.MouseEvent) => {
        const selectedAnswer = event.currentTarget.textContent || '';
        const regex = new RegExp(selectedAnswer, 'gi');

        const userAnswer = {
            isCorrect: !!currentQuestion.correctAnswer.match(regex),
            correctAnswer: currentQuestion.correctAnswer,
            selectedAnswer
        };

        if (userAnswer.isCorrect) setScore(score => score + 1);
        setUserAnswers(prevAnswers => [...prevAnswers, userAnswer]);
    };

    const handleNextQuestion = () => {
        setNumber(num => num + 1);

        setQuestionType(type =>
            type === QuestionTypes.CAPITAL ? QuestionTypes.FLAG : QuestionTypes.CAPITAL
        );
    };

    const loadingContent = (
        <Card>
            <p className="loading">Loading...</p>
        </Card>
    );

    const quizCardContent = (
        <QuizCard
            question={currentQuestion}
            questionType={questionType}
            hasAnswered={hasAnswered}
            userAnswer={userAnswers[number]}
            onAnswer={handleAnswer}
            onNextQuestion={handleNextQuestion}
        />
    );

    const resultCardContent = (
        <ResultsCard score={score} onLoadQuestions={loadQuestions} />
    );

    return (
        <Layout>
            {loading && !currentQuestion && loadingContent}
            {!loading && currentQuestion && !hasReachedEnd && quizCardContent}
            {!loading && hasReachedEnd && resultCardContent}
        </Layout>
    );
};

export default App;
