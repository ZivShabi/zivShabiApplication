import React from 'react';
import PageHeader from './PageHeader';
import useDynamicForm from '../../hooks/useDynamicForm';
import FormField from './FormField';
import { initialFormData, formValidationSchema, dataFormFieldsIdentity } from '../../data/dataFormFieldsIdentity';
import { updateUser } from '../../services/users/users';

function UserEditFields({ user, onClose, onSubmit }) {
    const {
        formData, formErrors, fieldValidationStatus,
        handleFieldChange, submitForm, getFieldInfo,
    } = useDynamicForm(initialFormData, formValidationSchema);

    function receivingConsoleData(event) {
        event.preventDefault();
        submitForm(async (formValues) => {
            try {
                const updatedUser = await updateUser(user._id, formValues);
                onSubmit(updatedUser);
                onClose();
            } catch (error) {
                console.error('Error updating user:', error);
            }
        });
    }

    return (
        <div>
            <PageHeader title="Model" description="Go ahead and log in to check out the latest update" />
            <form onSubmit={receivingConsoleData}>
                <div className="formFields">
                    {dataFormFieldsIdentity.map(({ name, type, label, required }) => {
                        const fieldValue = getFieldInfo(formData, name);
                        const fieldErrorMessage = getFieldInfo(formErrors, name) || null;
                        const isFieldValid = fieldValidationStatus[name] || false;
                        return (
                            <FormField
                                key={name}
                                name={name}
                                type={type}
                                label={label}
                                required={required}
                                value={fieldValue}
                                onChange={handleFieldChange}
                                errorMessage={fieldErrorMessage}
                                isValid={isFieldValid}
                            />
                        );
                    })}
                </div>
                <button className='submit' type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserEditFields;
