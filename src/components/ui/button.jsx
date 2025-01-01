import React from 'react';

const Button = ({ children, onClick, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export { Button };