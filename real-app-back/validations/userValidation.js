
const Joi = require('joi')
const errorMessages = {
    name: {
        first: {
            "string.empty": "First is required",
            "string.min": "First must be at least 2 characters"
        },
        middle: {
            "string.empty": "Middle is required",
            "string.min": "Middle must be at least 2 characters"
        },
        last: {
            "string.empty": "Last is required",
            "string.min": "Last must be at least 2 characters"
        }
    },
    email: {
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address"
    },
    password: {
        "string.empty": "Password is required",
        "string.min": "Password must be at least 10 characters"
    },
    isBusiness: {
        "string.empty": "isBusiness is required",
        "string.min": "isBusiness must be a boolean"
    },
    loginAttempts: {
        "string.empty": "Login Attempts is required",
        "string.min": "Login Attempts must be a number"
    },
    blockUntil: {
        "string.empty": "Block Until is required",
        "string.min": "Block Until must be a number"
    },
    image: {
        url: {
            "string.uri": "Image URL must be a valid URL",
            "string.empty": "Image URL is required"
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
        houseNumber: { "number.base": "House Number must be a positive number" }
    }
}
const validateUser = Joi.object({
    name: Joi.object({
        first: Joi.string().min(2).required().messages(errorMessages.name.first),
        middle: Joi.string().min(2).required().messages(errorMessages.name.middle),
        last: Joi.string().min(2).required().messages(errorMessages.name.last),
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages(errorMessages.email),
    password: Joi.string().min(10).required().messages(errorMessages.password),
    isBusiness: Joi.boolean().messages(errorMessages.isBusiness),
    loginAttempts: Joi.number().messages(errorMessages.loginAttempts),
    blockUntil: Joi.number().messages(errorMessages.blockUntil),
    image: Joi.object({
        url: Joi.string().uri().required().messages(errorMessages.image.url),
        alt: Joi.string().min(3).required().messages(errorMessages.image.alt)
    }),
    address: Joi.object({
        state: Joi.string().min(2).required().messages(errorMessages.address.state),
        country: Joi.string().min(2).required().messages(errorMessages.address.country),
        city: Joi.string().min(2).required().messages(errorMessages.address.city),
        street: Joi.string().min(2).required().messages(errorMessages.address.street),
        houseNumber: Joi.number().positive().required().messages(errorMessages.address.houseNumber)
    })
})
function validateRequest(validateUser) {
    return async (req, res, next) => {
        const { error } = validateUser.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({ errors: error.details.map(err => err.message) })
        } next()
    }
}


module.exports = { validateUser, validateRequest }
