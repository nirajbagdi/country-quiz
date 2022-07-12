import Card from '../Card/Card';
import { ReactComponent as SVGWinner } from '../../assets/undraw_winners.svg';
import styles from './ResultsCard.module.css';

type Props = {
    score: number;
    onLoadQuestions: () => void;
};

const ResultsCard: React.FC<Props> = ({ score, onLoadQuestions }) => {
    return (
        <Card className={styles.results}>
            <SVGWinner />
            <h2>Results</h2>
            <p>
                You got <span>{score}</span> correct answers
            </p>
            <button onClick={onLoadQuestions}>Try again</button>
        </Card>
    );
};

export default ResultsCard;
