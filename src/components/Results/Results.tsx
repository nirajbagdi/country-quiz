import { ReactComponent as WinnersSVG } from 'assets/winners.svg';
import Card from 'components/Card/Card';
import styles from './Results.module.css';

type Props = {
	score: number;
	onLoadQuestions: () => void;
};

const Results: React.FC<Props> = props => (
	<Card className={styles.results}>
		<WinnersSVG />
		<p className={styles.title}>Results</p>
		<p className={styles.desc}>
			You got <span>{props.score}</span> correct answers
		</p>
		<button onClick={props.onLoadQuestions}>Try again</button>
	</Card>
);

export default Results;
