import PageHeader from '../common/PageHeader'
import useDynamicForm from '../../hooks/useDynamicForm'
import { dataFormFieldsSignIn, initialFormData, formValidationSchema } from '../../data/dataFormFieldsIdentity'
import FormField from '../common/FormField'
import { login } from '../../services/users/users'
import { useNavigate, Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/User.Identification"

function SignIn() {
    const navigate = useNavigate()
    const { user, setUser } = useAuth()

    const {
        formData, formErrors, fieldValidationStatus,
        handleFieldChange, submitForm, getFieldInfo,
    } = useDynamicForm(initialFormData, formValidationSchema)

    function receivingConsoleData(event) {
        event.preventDefault()
        submitForm(async ({ email, password }) => {
            try {
                const credentials = { email, password }
                const data = await login(credentials)
                console.log(data)
                console.log(data.user)
                setUser(data.user)
                navigate('/')
            } catch (error) { }
        })
    }
    if (user) { return <Navigate to="/" /> }

    return (
        <div > <PageHeader title="Sign In"
            description="go ahead and log in to check out the latest updates" />
            <form onSubmit={receivingConsoleData}> <div className="formFields">
                {dataFormFieldsSignIn.map(({ name, type, label, required }) => {
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
} export default SignIn


