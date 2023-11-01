import styles from './Option.module.css';

type Props = {
	name: string;
	disabled?: boolean;
	isCorrect?: boolean;
	hasClicked?: boolean;
	onClick: () => void;
};

const Option: React.FC<Props> = props => {
	const classes = `${styles.option} ${
		props.isCorrect ? styles.correct : props.hasClicked && !props.isCorrect ? styles.wrong : ''
	}`;

	return (
		<button className={classes} onClick={props.onClick} disabled={props.disabled}>
			{props.name}
		</button>
	);
};

export default Option;
