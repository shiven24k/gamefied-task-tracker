import React from 'react';

const Card = ({ children, className }) => {
    return (
        <div className={`bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 ${className}`}>
            {children}
        </div>
    );
};

const CardHeader = ({ children, className }) => {
    return (
        <div className={`p-4 border-b border-gray-700 ${className}`}>
            {children}
        </div>
    );
};

const CardTitle = ({ children, className }) => {
    return (
        <h2 className={`text-2xl font-bold text-white ${className}`}>
            {children}
        </h2>
    );
};

const CardContent = ({ children, className }) => {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
};

export { Card, CardHeader, CardTitle, CardContent };