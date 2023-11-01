import styles from './Card.module.css';

type Props = {
	children: React.ReactNode;
	className?: string;
};

const Card: React.FC<Props> = ({ className, children }) => (
	<div className={`${styles.card} ${className}`}>{children}</div>
);

export default Card;
