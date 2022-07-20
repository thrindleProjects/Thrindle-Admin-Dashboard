import React from 'react'


const PrimaryInput = ({
    id,
    type,
    formikErrors,
    formikTouched,
    getFieldProps,
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
                    {...getFieldProps}
                    value={value}
                />
               
            </div>
            {formikTouched && formikErrors && (
                <div
                    className={
                        "block text-left ml-3 mt-2 h-3 font-regular text-xs   text-red-500"
                    }
                >
                    *{formikErrors}
                </div>
            )}
        </div>
    );
};

export default PrimaryInput
