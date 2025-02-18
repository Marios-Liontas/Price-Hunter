import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-black">
            <Header />
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
