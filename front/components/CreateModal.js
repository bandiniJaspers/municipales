import React, {Fragment} from 'react'
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Form, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import {FieldAsyncSelect, FieldCheckbox, FieldSelect, required, requiredArray, TextInput} from './FinalForm/TextInput'
import arrayMutators from 'final-form-arrays'
import fetch from 'isomorphic-unfetch'

const SourceArray = () => {
    return (
    <FieldArray name="sources" validate={requiredArray}>
        {({ fields }) => {
            return (
                <Fragment>
                    <div className={'add-source'} onClick={() => {fields.push('')}}>Ajouter une source</div>
                {fields.map((field, idx) => {
                    return (<Field key={idx} name={field} validate={required}>
                        {props => {
                            return <TextInput {...props} label={""} placeholder={"Source..."} />
                        }}
                    </Field>)
                })}
                </Fragment>
            )
        }

        }
    </FieldArray>
    )
}

const CreateModal = ({isOpen, toggle, onSubmit}) => {
    /*
    INVESTI
SOUTENU
CHEF DE FILE
Je ne sais pas

     */
    const modalities = [{label:"Investi", value:0}, {label:"Soutenu", value:1}, {label:"Chef de file", value:3}, {label: "Aucune idée", value:4}]
    const mutators = {
        setCommune: (_args, state, utils) => {
          utils.changeValue(state, "commune", () => _args[0])
        },
        setCodeCommune: (_args, state, utils) => {
            utils.changeValue(state, "codeCommune", () => _args[0])
        }
    }



    return (
        <Modal isOpen={isOpen} toggle={toggle} className={"create_modal_container"}>
            <ModalHeader toggle={toggle}><strong>Creer un candidat</strong></ModalHeader>
            <ModalBody>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{affiliation: "La republique en marche"}}
                    mutators={{...mutators, ...arrayMutators}}
                    render={({handleSubmit, values, form:{mutators}}) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <Field name={"password"} validate={required}>
                                    {props => {
                                        return <TextInput {...props} label={""} placeholder={"Password"} />
                                    }}
                                </Field>
                                <Field name={"nom"} validate={required}>
                                    {props => {
                                        return <TextInput {...props} label={""} placeholder={"Nom"} />
                                    }}
                                </Field>
                                <Field name={"prenom"} validate={required}>
                                    {props => {
                                        return <TextInput {...props} label={""} placeholder={"Prenom"} />
                                    }}
                                </Field>
                                <Field name={"affiliation"} validate={required}>
                                    {props => {
                                        return <TextInput {...props} label={""} placeholder={"Parti politique"} />
                                    }}
                                </Field>
                                <Field name={"hiddenLrem"} type={"checkbox"}>
                                    {props => {
                                        return <FieldCheckbox {...props} className={'create-politic-checkbox'} label={"Cache son appartenance a LREM"} name={"hiddenLrem"} />
                                    }}
                                </Field>
                                {values.hiddenLrem &&
                                    <SourceArray />
                                }
                                <Field name={"commune"} validate={required}>
                                    {props => {
                                        return <FieldAsyncSelect {...props} className={'create-select'} onChange={(value) => {mutators.setCommune(value); mutators.setCodeCommune(value.code);}} label={"commune"} placeholder={"Commune"} />
                                    }}
                                </Field>
                                <div className={'form-btn'}>
                                    <button type={"submit"}>Enregistrer</button>
                                </div>
                            </form>
                        )
                    }}
                />
            </ModalBody>
        </Modal>
    )
}

export default CreateModal;
