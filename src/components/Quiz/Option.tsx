import styles from './Option.module.css';

type Props = {
    name: string;
    disabled: boolean;
    isCorrect: boolean;
    hasClicked: boolean;
    onClick: (event: React.MouseEvent) => void;
};

const Option: React.FC<Props> = ({ name, disabled, isCorrect, hasClicked, onClick }) => {
    const classes = `${styles.option} ${
        isCorrect ? styles.correct : hasClicked && !isCorrect ? styles.wrong : ''
    }`;

    return (
        <button className={classes} onClick={onClick} disabled={disabled}>
            {name}
        </button>
    );
};

export default Option;
