import PageHeader from "../common/PageHeader"
import Logo from "../displays-main-page/Logo"
import '../../css/homePage.css'
import CardStructureHome from '../common/CardStructureHome'
import { useEffect } from 'react'
import { useCards } from '../../contexts/CardsContext'

function Home() {
    const { cards, handleToggleLike, fetchAllCards, loading, handleDeleteCard } = useCards()

    useEffect(() => {
        fetchAllCards()
    }, [])

    if (loading) { return <div>Loading...</div> }
    return (
        <div className="container-Home-Page">
            <PageHeader title={<>home <Logo /> </>} description={` The home page of the project where 
            I will present content of  project`} />
            <div className="cards-grid">{cards.map(card => (<CardStructureHome
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
                onLike={() => handleToggleLike(card._id, card.liked)}
            />))} </div>
        </div>
    )
} export default Home
