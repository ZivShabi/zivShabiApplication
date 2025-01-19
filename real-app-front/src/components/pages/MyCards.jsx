import { useEffect } from 'react'
import CardStructureHome from '../common/CardStructureHome'
import PageHeader from '../common/PageHeader'
import '../../css/myCards.css'
import { useCards } from '../../contexts/CardsContext'
function MyCards() {
    const { cards, handleToggleLike, loading, handleDeleteCard, fetchMyCards } = useCards()

    useEffect(() => {
        fetchMyCards()
    }, [])

    if (loading) { return <div>Loading</div> }
    return (<div className="container-My-Cards"> <PageHeader title={'My Cards'}
        description={'These are the cards you created to save as favorites like'} />
        <div className="cards-grid"> {cards.length > 0 ? (cards.map((card) => (<CardStructureHome
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
                liked: card.liked,
                creatorId: card.userId,
                likesCount: card.likes.length,
            }}
            onDelete={() => handleDeleteCard(card._id)}
            onLike={() => handleToggleLike(card._id, card.liked)} />
        ))) : ('')} </div>
    </div>)
}
export default MyCards
