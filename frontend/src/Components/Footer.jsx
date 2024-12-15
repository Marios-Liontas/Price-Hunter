import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}{" "}
                    <span className="text-orange-500 font-semibold">Price-Hunter</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
