import Header from '../Header/Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="app">
        <div className="container">
            <Header />
            {children}
        </div>
    </div>
);

export default Layout;
