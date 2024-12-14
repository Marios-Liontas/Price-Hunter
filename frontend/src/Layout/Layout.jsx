import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar"


const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <SearchBar/>
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
};

export default Layout;