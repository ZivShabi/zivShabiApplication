
import CardStructureHome from '../CardStructureHome'

function CardsView({ cards, user, handleDeleteCard, handleToggleLike }) {
    return (
        <div className="cards-grid">
            {cards.map(card => (
                <CardStructureHome
                    key={card._id}
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
                        liked: card.likes.includes(user._id),
                        likesCount: card.likes.length,
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