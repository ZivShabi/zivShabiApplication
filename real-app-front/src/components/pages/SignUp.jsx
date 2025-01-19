import PageHeader from '../common/PageHeader'
import useDynamicForm from '../../hooks/useDynamicForm'
import { dataFormFieldsIdentity, initialFormData, formValidationSchema } from '../../data/dataFormFieldsIdentity'
import FormField from '../common/FormField'
import { registerUser } from '../../services/users/users'
import { useNavigate, Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/User.Identification"

function SignUp() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const { formData, formErrors, fieldValidationStatus,
        handleFieldChange, submitForm, getFieldInfo
    } = useDynamicForm(initialFormData, formValidationSchema)

    function receivingConsoleData(event) {
        event.preventDefault()
        submitForm(async (data) => {
            try {
                const res = await registerUser(data)
                navigate('/sign-in')
                console.log('Form Data', data)
                console.log('Response', res)
            } catch (error) { }
        })
    }
    if (user) { return <Navigate to="/" /> }
    return (
        <div> <PageHeader className="signup-page-header" title="Sign Up"
            description="your chance to sign up for my new social network" />

            <form onSubmit={receivingConsoleData}> <div className="formFields">
                {dataFormFieldsIdentity.map(({ name, type, label, required }) => {
                    const fieldValue = getFieldInfo(formData, name)
                    const fieldErrorMessage = getFieldInfo(formErrors, name) || null
                    const isFieldValid = fieldValidationStatus[name] || false
                    return (<FormField
                        key={name}
                        name={name}
                        type={type}
                        label={label}
                        required={required}
                        value={fieldValue}
                        onChange={handleFieldChange}
                        errorMessage={fieldErrorMessage}
                        isValid={isFieldValid}
                    />)
                })} </div> <button className='submit' type="submit">Submit</button>
            </form>
        </div>
    )
} export default SignUp


