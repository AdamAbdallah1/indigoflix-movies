import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark-100 text-gray-400 text-center py-4">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Adam Abdallah — All rights reserved.
            </p>
        </footer>
    )
}

export default Footer