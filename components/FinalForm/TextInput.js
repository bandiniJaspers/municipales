import React from 'react';
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import fetch from 'isomorphic-unfetch'

export const FieldCheckbox = ({name, onChange, input, disabled = false, className, label, value}) => {
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

const asyncLoad = async (value) => {
    const res = await fetch(`commune/search?search=${value}`);
    const result = await res.json();
    // on récupère les 10 premiers résultats, pour des raisons de performances.
    return result.slice(0,10).map((c) => ({label:c.nom, code:c.codeCommune, value:c._id}));
};

export const FieldAsyncSelect = ({input, label, meta: { touched, error}, options, placeholder, disabled, className, onChange = null}) => {
    return (
        <div className={className}>
            <AsyncSelect
                {...input}
                name={label}
                isDisabled={false}
                isSearchable={true}
                defaultOptions={true}
                loadOptions={(selectValue) => asyncLoad(selectValue)}
                placeholder={placeholder}
                classNamePrefix="create-politic"
                className="content"
            />
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
