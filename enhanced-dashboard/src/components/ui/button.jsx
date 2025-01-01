import React from 'react';

const Button = ({ children, onClick, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export { Button };