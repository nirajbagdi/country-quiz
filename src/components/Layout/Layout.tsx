import Header from 'components/Header/Header';

type Props = {
	children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
	<div className="app">
		<div className="container">
			<Header />
			{children}
		</div>
	</div>
);

export default Layout;
