
import httpService from "../httpService"
import API_ROUTES from "../apiRoutes"

export async function getAllCards() {
    try {
        const res = await httpService.get(API_ROUTES.CARDS.GET_ALL)
        return res.data
    } catch (error) {
        console.error("Error fetching getAllCards", error.message)
        throw error
    }
}
export async function getMyCards() {
    try {
        const res = await httpService.get(API_ROUTES.CARDS.USER_Id)
        return res.data
    } catch (error) {
        console.error("Error fetching getMyCards", error.message)
        throw error
    }
}
export async function createCard(cardData) {
    try {
        const res = await httpService.post(API_ROUTES.CARDS.CREATE, cardData)
        return res.data
    } catch (error) {
        console.error("Error fetching createCard", error.res?.data || error.message)
    }
}

export async function LikeCard(id) {
    try {
        const res = await httpService.post(API_ROUTES.CARDS.LIKE(id))
        return res.data
    } catch (error) {
        console.error("Error liking card", error.res?.data || error.message)
        throw error
    }
}

export async function UnlikeCard(id) {
    try {
        const res = await httpService.delete(API_ROUTES.CARDS.UN_LIKE(id))
        return res.data
    } catch (error) {
        console.error("Error unliking card", error.res?.data || error.message)
        throw error
    }
}


export async function getCardId(id) {
    try {
        return await httpService.get(API_ROUTES.CARDS.CARD_ID(id))

    } catch (error) { }
}

export async function deleteCard(id) {
    try {
        const res = await httpService.delete(API_ROUTES.CARDS.DELETE(id))
        return res.data
    } catch (error) { }
}