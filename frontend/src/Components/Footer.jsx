import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Price Hunter. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;