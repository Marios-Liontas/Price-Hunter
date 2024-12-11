import React, { useState } from 'react';

const Header = () => {

    //State to control mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //Toggling the state from false to true or the other way around
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <div className='bg-gray-900 text-white py-4 sticky top-0 z-50'>
            <div className='container mx-auto flex items-center justify-between'>
                
                <div className=' flex items-center gap-2'>
                    <img src="/price-hunter-logo.jpg" alt="" className='w-13 h-12' />
                    <h1 className='text-2xl font-bold'>
                        Price Hunter
                    </h1>
                </div>


                { /* Mobile Hamburger Icon */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-white focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                
                <nav
                    className='hidden lg:flex gap-4'
                >
                    <a href="/" className="hover:text-blue-400">Home</a>
                    <a href="/deals" className="hover:text-blue-400">Deals</a>
                    <a href="/platforms" className="hover:text-blue-400">Platforms</a>
                    <a href="/about" className="hover:text-blue-400">About</a>
                </nav>

                
            </div>

            {/* Mobile Menu (For small screens) */}
            {isMenuOpen && (
                <div className="lg:hidden bg-gray-800 py-4 px-6 mt-2">
                    <a href="/" className="block py-2 hover:text-blue-400">Home</a>
                    <a href="/deals" className="block py-2 hover:text-blue-400">Deals</a>
                    <a href="/platforms" className="block py-2 hover:text-blue-400">Platforms</a>
                    <a href="/about" className="block py-2 hover:text-blue-400">About</a>
                </div>
            )}

        </div>
    )
};

export default Header