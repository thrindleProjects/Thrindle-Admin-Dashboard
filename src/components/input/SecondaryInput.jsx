import React from 'react'


const SecondaryInput = ({
    id,
    type,
    
    label,
    placeholder,
    onChange,
    value
}) => {
    
    return (
        <div className="mb-4  ">
            <label className="block text-gray-400 text-xs  mb-2" htmlFor={id}>
                {label}
            </label>
            <div className="flex justify-between border  appearance-none   rounded-lg w-full py-3  px-3 text-gray-700 leading-tight  ">
                <input
                    onChange={onChange}
                    className="outline-none w-full focus:bg-transparent  bg-transparent  "
                    id={id}
                    type={ type}
                    placeholder={placeholder}
                    value={value}
                />
               
            </div>
           
        </div>
    );
};

export default SecondaryInput
