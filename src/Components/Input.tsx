import React, { useState } from "react";

interface InputProps {
    label?: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    regex?: RegExp;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    name,
    type = "text",
    value,
    placeholder,
    regex,
    errorMessage,
    onChange,
    required = false,
    className ,
}) => {
    const [error, setError] = useState<string | undefined>(undefined);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (regex && !regex.test(newValue)) {
            setError(errorMessage || "Invalid input");
        } else {
            setError(undefined);
        }
        onChange(e);
    };

    return (
        <div className="flex flex-col flex-grow">
            <label className="font-medium">{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleInputChange}
                className={`border rounded-md p-2 ${error ? "border-red-500" : ""} ${className}`}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};
