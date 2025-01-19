

import { useState, useRef, useCallback, } from 'react'
import Joi from 'joi'

function useDynamicForm(initialFormData, formValidationSchema) {

    const [formData, setFormData] = useState(initialFormData)
    const formErrorsRef = useRef({})
    const fieldValidationStatusRef = useRef({})

    const validateField = useCallback((fieldName, fieldValue) => {

        const fieldParts = fieldName.split('.')
        let currentSchema = formValidationSchema

        for (let i = 0; i < fieldParts.length; i++) {
            currentSchema = currentSchema.extract(fieldParts[i])
            if (!currentSchema) break
        }
        const fieldSchema = Joi.object({ [fieldParts[fieldParts.length - 1]]: currentSchema })
        const { error } = fieldSchema.validate({ [fieldParts[fieldParts.length - 1]]: fieldValue })

        return error ? error.details[0].message : ''
    }, [])

    function handleFieldChange(event) {
        let { name, value } = event.target
        if (event.target.type === 'checkbox') {
            value = event.target.checked
        }
        updateFormData(name, value)
        updateFieldValidation(name, value)
    }

    function updateFieldValidation(name, value) {
        const fieldErrorMessage = validateField(name, value)
        const updatedErrors = { ...formErrorsRef.current }
        const keys = name.split('.')
        let errorData = updatedErrors

        while (keys.length > 1) {
            const key = keys.shift()
            errorData[key] = { ...errorData[key] }
            errorData = errorData[key]
        }

        errorData[keys[0]] = fieldErrorMessage
        formErrorsRef.current = updatedErrors
        fieldValidationStatusRef.current[name] = !fieldErrorMessage
    }

    function updateFormData(name, value) {
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData }
            const keys = name.split('.')
            let data = updatedFormData

            while (keys.length > 1) {
                const key = keys.shift()
                data[key] = { ...data[key] }
                data = data[key]
            }
            data[keys[0]] = value
            return updatedFormData
        })
    }

    function getFieldInfo(data, name) {
        return name.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : '', data)
    }

    function submitForm(onSuccessCallback) {
        const isFormValid = Object.values(fieldValidationStatusRef.current).every((status) => status)
        if (isFormValid) {
            onSuccessCallback(formData)
            setFormData(initialFormData)
            formErrorsRef.current = {}
            fieldValidationStatusRef.current = {}
        }
    }

    return {
        formData,
        formErrors: formErrorsRef.current,
        handleFieldChange,
        submitForm,
        fieldValidationStatus: fieldValidationStatusRef.current,
        getFieldInfo,
    }
}

export default useDynamicForm
