import React from 'react';

const Input = ({ type = "text", placeholder, value, onChange, className }) => {
    return (
      <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none ${className}`}
      />
    );
  };

export { Input };