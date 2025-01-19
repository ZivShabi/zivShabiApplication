

import Joi from 'joi'
export const dataFormFieldsCreateCard = [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'subtitle', type: 'text', label: 'Subtitle', required: true },
    { name: 'description', type: 'text', label: 'Description', required: true },
    { name: 'phone', type: 'tel', label: 'Phone', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'web', type: 'url', label: 'Web URL', required: true },
    { name: 'image.url', type: 'url', label: 'Image URL', required: true },
    { name: 'image.alt', type: 'text', label: 'Image Alt Text', required: true },
    { name: 'address.state', type: 'text', label: 'State', required: true },
    { name: 'address.country', type: 'text', label: 'Country', required: true },
    { name: 'address.city', type: 'text', label: 'City', required: true },
    { name: 'address.street', type: 'text', label: 'Street', required: true },
    { name: 'address.houseNumber', type: 'number', label: 'House Number', required: true }, { name: 'address.zip', type: 'text', label: 'Zip Code', required: true },
]

const titleErrorMsg = { "string.empty": "Title is required", "string.min": "Title must be at least 2 characters" }
const subtitleErrorMsg = { "string.empty": "Subtitle is required", "string.min": "Subtitle must be at least 2 characters" }
const descriptionErrorMsg = { "string.empty": "Description is required", "string.min": "Description must be at least 2 characters" }
const phoneErrorMsg = { "string.empty": "Phone is required", "string.pattern.base": "The phone number must be a valid phone number starting with 052, 054, 055 (10 digits) or 03, 077 (9 to 11 digits)" }
const phonePattern = /^((\+972|972|0)?(52|54|55)\d{7}|(\+972|972|0)?(3|77)\d{7,9})$/;
const emailErrorMsg = { "string.empty": "Email is required", "string.email": "Email must be a valid email address" }
const webErrorMsg = { "string.empty": "Web URL is required", "string.uri": "Web must be a valid URL" }
const imageUrlErrorMsg = { "string.uri": "Image URL must be a valid URL", "string.empty": "Image URL is required" }
const imageAltErrorMsg = { "string.empty": "Image alt text is required", "string.min": "Image alt text must be at least 3 characters" }
const addressStateErrorMsg = { "string.empty": "State is required", "string.min": "State must be at least 2 characters" }
const addressCountryErrorMsg = { "string.empty": "Country is required", "string.min": "Country must be at least 2 characters" }
const addressCityErrorMsg = { "string.empty": "City is required", "string.min": "City must be at least 2 characters" }
const addressStreetErrorMsg = { "string.empty": "Street is required", "string.min": "Street must be at least 2 characters" }
const addressHouseNumberErrorMsg = { "number.base": "House Number must be a positive number" }
const addressZipErrorMsg = { "string.empty": "Zip code is required", "string.min": "Zip code must be at least 2 characters" }

export const formValidationSchema = Joi.object({
    title: Joi.string().min(2).required().messages(titleErrorMsg),
    subtitle: Joi.string().min(2).required().messages(subtitleErrorMsg),
    description: Joi.string().min(2).required().messages(descriptionErrorMsg),
    phone: Joi.string().pattern(phonePattern).required().messages(phoneErrorMsg),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages(emailErrorMsg),
    web: Joi.string().uri().required().messages(webErrorMsg),
    image: Joi.object({
        url: Joi.string().uri().required().messages(imageUrlErrorMsg),
        alt: Joi.string().min(3).required().messages(imageAltErrorMsg)
    }).required(),
    address: Joi.object({
        state: Joi.string().min(2).required().messages(addressStateErrorMsg),
        country: Joi.string().min(2).required().messages(addressCountryErrorMsg),
        city: Joi.string().min(2).required().messages(addressCityErrorMsg),
        street: Joi.string().min(2).required().messages(addressStreetErrorMsg),
        houseNumber: Joi.number().integer().positive().required().messages(addressHouseNumberErrorMsg),

        zip: Joi.string().min(2).required().messages(addressZipErrorMsg),
    }).required()
})



export const initialFormData = {
    title: 'user card',
    subtitle: 'subtitle',
    description: 'description',
    phone: '0525050505',
    email: 'customhook@walla.com',
    web: 'https://www.example.com',
    image: {
        url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        alt: 'alt',
    },
    address: {
        state: 'Israel',
        country: 'country',
        city: 'TLV',
        street: 'street',
        houseNumber: '123',
        zip: '676767',
    }
}

