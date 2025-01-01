import React from 'react';

const Progress = ({ value, className }) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
         <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
            <div
                className="h-full bg-green-500"
                style={{ width: `${clampedValue}%` }}
            />
        </div>
    );
};

export { Progress };