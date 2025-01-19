const Joi = require('joi')
const errorMessages = {
    title: {
        "string.empty": "Title is required",
        "string.min": "Title must be at least 2 characters",
        "string.max": "Title must not exceed 255 characters"
    },
    subtitle: {
        "string.empty": "Subtitle is required",
        "string.min": "Subtitle must be at least 2 characters"
    },
    description: {
        "string.empty": "Description is required",
        "string.min": "Description must be at least 2 characters",
        "string.max": "Description must not exceed 1024 characters"
    },
    email: {
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address"
    },
    image: {
        url: {
            "string.empty": "Image URL is required",
            "string.uri": "Image URL must be a valid URL"
        },
        alt: {
            "string.empty": "Image alt text is required",
            "string.min": "Image alt text must be at least 3 characters"
        }
    },
    address: {
        state: {
            "string.empty": "State is required",
            "string.min": "State must be at least 2 characters"
        },
        country: {
            "string.empty": "Country is required",
            "string.min": "Country must be at least 2 characters"
        },
        city: {
            "string.empty": "City is required",
            "string.min": "City must be at least 2 characters"
        },
        street: {
            "string.empty": "Street is required",
            "string.min": "Street must be at least 2 characters"
        },
        houseNumber: {
            "number.base": "House Number must be a number",
            "number.positive": "House Number must be positive",
            "any.required": "House Number is required"
        },
        zip: {
            "string.empty": "ZIP Code is required",
            "string.min": "ZIP Code must be at least 2 characters"
        }
    },
    phone: {
        "string.empty": "Phone number is required",
        "string.pattern.base": "Phone number must be 10 digits"
    },
    web: {
        "string.empty": "Website is required",
        "string.uri": "Website must be a valid URL"
    }
}
const validateCard = Joi.object({
    title: Joi.string().min(2).max(255).required().messages(errorMessages.title),
    subtitle: Joi.string().min(2).required().messages(errorMessages.subtitle),
    description: Joi.string().min(2).max(1024).required().messages(errorMessages.description),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages(errorMessages.email),
    image: Joi.object({
        url: Joi.string().uri().required().messages(errorMessages.image.url),
        alt: Joi.string().min(3).required().messages(errorMessages.image.alt)
    }).required(),
    address: Joi.object({
        state: Joi.string().min(2).required().messages(errorMessages.address.state),
        country: Joi.string().min(2).required().messages(errorMessages.address.country),
        city: Joi.string().min(2).required().messages(errorMessages.address.city),
        street: Joi.string().min(2).required().messages(errorMessages.address.street),
        houseNumber: Joi.number().integer().positive().required().messages(errorMessages.address.houseNumber),
        zip: Joi.string().min(2).required().messages(errorMessages.address.zip),
    }).required(),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages(errorMessages.phone),
    web: Joi.string().uri().required().messages(errorMessages.web),
})

function validateRequest(validateCard) {
    return async (req, res, next) => {
        const { error } = validateCard.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({ errors: error.details.map(err => err.message) })
        }
        next()
    }
}

module.exports = { validateCard, validateRequest }
