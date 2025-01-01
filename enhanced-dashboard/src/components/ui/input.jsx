import React from 'react';

const Input = ({ type = "text", placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none
                  ${className}`}
    />
  );
};

export { Input };