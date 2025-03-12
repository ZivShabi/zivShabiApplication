import PageHeader from '../common/PageHeader'
import useDynamicForm from '../../hooks/useDynamicForm'
import FormField from '../common/FormField'
import { useNavigate } from "react-router-dom"
import { createCard } from '../../services/cards/cardsService'
import { dataFormFieldsCreateCard, initialFormData, formValidationSchema } from '../../data/dataFormFieldsCreateCard'
import { useCards } from '../../contexts/CardsContext'

function CreateCard() {
    const navigate = useNavigate()
    const { setCards } = useCards()
    const { formData, formErrors, fieldValidationStatus,
        handleFieldChange, submitForm, getFieldInfo
    } = useDynamicForm(initialFormData, formValidationSchema)

    function receivingConsoleData(event) {
        event.preventDefault()
        submitForm(async (cardData) => {
            try {
                const newCard = await createCard(cardData)
                setCards(prevCards => [...prevCards, newCard])
                navigate('/')
            } catch (error) { console.error("Error card", error) }
        })
    }
    return (<div> <PageHeader className="signup-page-header" title="Create Card"
        description="Your chance create new digital card my social network" />

        <form onSubmit={receivingConsoleData}> <div className="formFields">
            {dataFormFieldsCreateCard.map(({ name, type, label, required }) => {
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
            })} </div> <button className='submit btn btn-outline-primary like-button'
                type="submit"> <i className="bi bi-send-plus"></i>
            </button>
        </form>
    </div>)
} export default CreateCard


