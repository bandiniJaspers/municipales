import React, {Fragment} from 'react'
import { Form, Field } from "react-final-form";
import arrayMutators from 'final-form-arrays'
import {FieldCheckbox, TextInput} from '../FinalForm/TextInput'

const Filters = ({filters, onSubmit}) => {

    const getPartiField = (idx) =>  <Field name={"parti"}>
        {props => {
            return <TextInput key={`filter_field_${idx}`} {...props} label={""} placeholder={"Parti"} />
        }}
    </Field>

    const getHiddenLremField = (idx, label) =>  <Field name={"hiddenLrem"} type={"checkbox"}>
        {props => {
            return <FieldCheckbox key={`filter_field_${idx}`} {...props} className={'search_filter_hiddenLrem'} label={label} name={"hiddenLrem"} />
        }}
    </Field>

    return (
        <div className={'main_search_filters'}>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, values}) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            {filters.map((f, idx) => {
                                if (f.id === "hiddenLrem")
                                    return getHiddenLremField(idx, f.label)
                                if (f.id === "parti")
                                    return getPartiField(idx)
                            })}
                            <div className={'search_filters_submit'}>
                                <button type={"submit"}>Rechercher</button>
                            </div>
                        </form>
                    )
                }}
            />

        </div>
    )
}

export default Filters
