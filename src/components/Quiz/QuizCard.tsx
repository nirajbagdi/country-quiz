import { Question, QuestionTypes, UserAnswer } from '../../models';

import Option from './Option';
import Card from '../Card/Card';

import styles from './QuizCard.module.css';

type Props = {
    question: Question;
    questionType: QuestionTypes;
    hasAnswered: boolean;
    userAnswer: UserAnswer;
    onAnswer: (event: React.MouseEvent) => void;
    onNextQuestion: () => void;
};

const QuizCard: React.FC<Props> = props => {
    const questionTitle =
        props.questionType === QuestionTypes.FLAG
            ? 'What country does this flag belong to?'
            : `${props.question?.country.capital} is the capital of`;

    const optionsContent = props.question?.options.map((option, idx) => (
        <Option
            key={idx}
            name={option}
            disabled={props.hasAnswered}
            hasClicked={props.userAnswer?.selectedAnswer === option}
            isCorrect={props.userAnswer?.correctAnswer === option}
            onClick={props.onAnswer}
        />
    ));

    return (
        <Card className={styles.quiz}>
            {props.questionType === QuestionTypes.FLAG && (
                <img
                    src={props.question?.country.flag}
                    alt={props.question?.country.name}
                />
            )}

            <p className={styles.title}>{questionTitle}</p>
            <div className={styles.options}>{optionsContent}</div>

            {props.hasAnswered && (
                <div className={styles.actions}>
                    <button onClick={props.onNextQuestion}>Next</button>
                </div>
            )}
        </Card>
    );
};

export default QuizCard;
