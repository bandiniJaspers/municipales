import React, {Fragment} from 'react'
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Form, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import {FieldCheckbox, FieldSelect, TextInput} from './FinalForm/TextInput'
import arrayMutators from 'final-form-arrays'

const SourceArray = () => {
    return (
    <FieldArray name="sources">
        {({ fields }) => {
            return (
                <Fragment>
                    <div onClick={() => {fields.push('')}}>Ajouter une source</div>
                {fields.map((field, idx) => {
                    return (<Field key={idx} name={field}>
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

const CreateModal = ({isOpen, toggle, onSubmit, communes}) => {
    console.log("CreateModal::", communes);
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
            console.log("mutators::State::", state);
            utils.changeValue(state, "codeCommune", () => _args[0])
        }
    }

    const onUpdateCommune = (value) => {
        console.log("onUpdateCommune", e, value);
        mutators.setCommune(value);
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Creer un candidat</ModalHeader>
            <ModalBody>
                <Form
                    onSubmit={onSubmit}
                    mutators={{...mutators, ...arrayMutators}}
                    render={({handleSubmit, values, form:{mutators}}) => {
                        console.log("Values::", values);
                        return (
                            <form onSubmit={handleSubmit}>
                                <Field name={"nom"}>
                                    {props => {
                                        return <TextInput {...props} label={"Nom"} placeholder={"Nom"} />
                                    }}
                                </Field>
                                <Field name={"prenom"}>
                                    {props => {
                                        return <TextInput {...props} label={"Prenom"} placeholder={"Nom"} />
                                    }}
                                </Field>
                                <Field name={"affiliation"}>
                                    {props => {
                                        return <TextInput {...props} label={"Parti politique"} placeholder={"Nom"} />
                                    }}
                                </Field>
                                <Field name={"hiddenLrem"} type={"checkbox"}>
                                    {props => {
                                        return <FieldCheckbox {...props} label={"Cache son appartenance a LREM"} name={"hiddenLrem"} />
                                    }}
                                </Field>
                                {values.hiddenLrem &&
                                    <SourceArray />
                                }
                                <Field name={"commune"}>
                                    {props => {
                                        return <FieldSelect {...props} onChange={(value) => {mutators.setCommune(value); mutators.setCodeCommune(value.code);}} label={"commune"} placeholder={"Commune"} options={communes}/>
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
