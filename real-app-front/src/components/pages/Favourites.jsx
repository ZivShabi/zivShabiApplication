

import { useEffect } from 'react'
import { useCards } from '../../contexts/CardsContext'
import PageHeader from '../common/PageHeader'
import CardStructureHome from '../common/CardStructureHome'
import { useAuth } from '../../contexts/User.Identification'
import '../../css/favourites.css'

function Favourites() {
    const { cards, loading, fetchLikedCards, handleUnlikeCard } = useCards()
    const { user } = useAuth()
    const userId = user?.id

    useEffect(() => {
        if (userId) fetchLikedCards(userId)
    }, [userId, fetchLikedCards]);

    if (loading) return <div>Loading...</div>

    return (
        <div className="container-Favourites">
            <PageHeader title="Favourites" description="Your favourite cards" />
            <div className="cards-grid"> {cards.length > 0 ? (
                cards.map(card => (<CardStructureHome
                    key={card._id}
                    {...card}
                    onDelete={() => handleUnlikeCard(card._id)} />
                ))) : (<p>No favourite cards yet</p>
            )}  </div>
        </div>
    )
}

export default Favourites
