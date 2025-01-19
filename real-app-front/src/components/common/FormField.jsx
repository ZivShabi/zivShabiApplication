

import ErrorMessage from './ErrorMessage'
import '../../css/formField.css'
function FormField({ name, type, label, required, value, onChange, errorMessage, isValid }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value || ''}
                onChange={onChange}
                required={required}
            />
            <ErrorMessage
                message={errorMessage}
                isValid={isValid}
            />
        </div>
    )
}

export default FormField
