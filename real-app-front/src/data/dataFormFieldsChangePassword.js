

import Joi from 'joi'


export const dataFormFieldsChangePassword = [
    { name: 'oldPassword', type: 'text', label: 'Old Password', required: true },
    { name: 'newPassword', type: 'text', label: 'New Password', required: true },

]


const passwordErrorMsg = {
    "string.empty": "Password is required",
    "string.min": "Password must be at least 10 characters",
};

export const formValidationSchema = Joi.object({
    oldPassword: Joi.string().min(10).required().messages(passwordErrorMsg),
    newPassword: Joi.string().min(10).required().messages(passwordErrorMsg),

});




export const initialFormData = {
    oldPassword: '',
    newPassword: '',
}

