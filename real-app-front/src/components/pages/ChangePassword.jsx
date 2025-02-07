import PageHeader from '../common/PageHeader'
import useDynamicForm from '../../hooks/useDynamicForm'
import { dataFormFieldsChangePassword, initialFormData, formValidationSchema } from '../../data/dataFormFieldsChangePassword'
import FormField from '../common/FormField'
import { useNavigate } from "react-router-dom"
import { changePassword } from '../../services/users/users'
function ChangePassword() {
    const navigate = useNavigate()

    const { formData, formErrors, fieldValidationStatus, handleFieldChange, submitForm, getFieldInfo } = useDynamicForm(initialFormData, formValidationSchema)

    function receivingConsoleData(event) {
        event.preventDefault()
        submitForm(async (data) => {
            try {
                await changePassword(data)
                navigate('/')
            } catch (error) { }
        })
    }

    return (<div className='changePassword'>
        <PageHeader className="signup-page-header" title="Change Password"
            description="It is recommended to change password from time to time "
        />

        <form onSubmit={receivingConsoleData}>
            <div className="formFields">
                <div className=""><h1 className=" like-button ">
                    <i className='bi bi-file-earmark-lock '></i>
                </h1>
                    <button className='submit btn btn-outline-primary like-button'
                        type="submit"> <i className="bi bi-send-plus"></i>
                    </button>
                </div>
                {dataFormFieldsChangePassword.map(({ name, type, label, required }) => {
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
                })} </div>
        </form>
    </div>)
} export default ChangePassword
