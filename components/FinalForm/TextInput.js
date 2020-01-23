import React from 'react';
import Select from 'react-select'


export const FieldCheckbox = ({name, onChange, input, disabled = false, className, label, value}) => {
    console.log("Checkbox::", value);
    return (
        <div className={className}>
            <input
                type={"checkbox"}
                name={name}
                onChange={onChange}
                disabled={disabled}
                checked={value}
                {...input}
            />
            <label>{label}</label>
        </div>
    )
}

export const TextInput = ({disabled = false, label, placeholder, input, className, meta: {touched, error}}) => {
    return (
        <div className={className}>
            <label>{label}</label>
            <input
                type={"text"}
                disabled={disabled}
                placeholder={placeholder}
                {...input} />
            {touched && error && (
                <span className="form__form-group-error formError">{error}</span>
            )}
        </div>
    )
}

export const FieldSelect = ({input, label, meta: { touched, error}, options, placeholder, disabled, className, onChange = null}) => {
    return (
        <div className={className}>
            <Select
                {...input}
                name={label}
                isDisabled={disabled}
                options={options}
                onChange={onChange}
                placeholder={placeholder}
            />
            {touched && error && (
                <span className="form__form-group-error formError">{error}</span>
            )}
        </div>
    )
}
