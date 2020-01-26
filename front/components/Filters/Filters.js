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

    const getHiddenLremField = (idx) =>  <Field name={"hiddenLrem"} type={"checkbox"}>
        {props => {
            return <FieldCheckbox key={`filter_field_${idx}`} {...props} className={'create-politic-checkbox'} label={"Cache son appartenance a LREM"} name={"hiddenLrem"} />
        }}
    </Field>

    return (
        <Fragment>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, values}) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            {filters.map((f, idx) => {
                                if (f === "hiddenLrem")
                                    return getHiddenLremField(idx)
                                if (f === "parti")
                                    return getPartiField(idx)
                            })}
                            <div className={'form-btn'}>
                                <button type={"submit"}>Enregistrer</button>
                            </div>
                        </form>
                    )
                }}
            />

        </Fragment>
    )
}

export default Filters
