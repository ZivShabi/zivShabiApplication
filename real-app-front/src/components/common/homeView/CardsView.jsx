
import CardStructureHome from '../CardStructureHome'

function CardsView({ cards, user, handleDeleteCard, handleToggleLike }) {
    const getCards = Array.isArray(cards) ? cards : []

    return (
        <div className="cards-grid">
            {getCards.map((card, index) => (

                <CardStructureHome
                    key={card._id || index}
                    cardData={{
                        title: card.title,
                        description: card.description,
                        email: card.email,
                        web: card.web,
                        imageSrc: card.image?.url,
                        alt: card.title,
                        openingText: card.openingText,
                        phone: card.phone,
                        addressLine1: card.address.street,
                        addressLine2: card.address.houseNumber,
                        city: card.address.city,
                        state: card.address.state,
                        zip: card.address.zip,
                        liked: Array.isArray(card.likes) && card.likes.includes(user._id),
                        likesCount: Array.isArray(card.likes) ? card.likes.length : 0,
                        creatorId: card.userId,
                    }}
                    onDelete={() => handleDeleteCard(card._id, card.liked)}
                    onLike={() => handleToggleLike(card._id, card.liked)}
                />

            ))}
        </div>
    );
}

export default CardsView