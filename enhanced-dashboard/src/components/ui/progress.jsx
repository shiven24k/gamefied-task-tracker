import React from 'react';

const Progress = ({ value, className }) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    return (
        <div className={`w-full h-4 bg-gray-700 rounded-full overflow-hidden ${className}`}>
             <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ width: `${clampedValue}%` }}
             />
        </div>
    );
};

export { Progress };