import Option from './Option';
import Card from 'components/Card/Card';
import { Question, QuestionType, UserAnswer } from 'models';
import styles from './Quiz.module.css';

type Props = {
	question: Question;
	userAnswer: UserAnswer;
	hasAnswered: boolean;
	onAnswer: (answer: string) => void;
	onNextQuestion: () => void;
};

const Quiz: React.FC<Props> = props => {
	if (!props.question) {
		return null;
	}

	const handleOptionClick = (option: string) => {
		if (!props.hasAnswered) props.onAnswer(option);
	};

	const optionsContent = props.question.options.map((option, idx) => (
		<Option
			key={idx}
			name={option}
			disabled={props.hasAnswered}
			hasClicked={props.userAnswer?.userAnswer === option}
			isCorrect={props.userAnswer?.correctAnswer === option}
			onClick={() => handleOptionClick(option)}
		/>
	));

	const renderNextButton = () => {
		if (props.hasAnswered) {
			return (
				<div className={styles.actions}>
					<button onClick={props.onNextQuestion}>Next</button>
				</div>
			);
		}

		return null;
	};

	return (
		<Card className={styles.quiz}>
			{props.question.type === QuestionType.FLAG && (
				<img
					src={props.question.country.flags.svg}
					alt={props.question.country.flags.alt}
				/>
			)}

			<p className={styles.title}>{props.question.title}</p>
			<div className={styles.options}>{optionsContent}</div>
			{renderNextButton()}
		</Card>
	);
};

export default Quiz;
