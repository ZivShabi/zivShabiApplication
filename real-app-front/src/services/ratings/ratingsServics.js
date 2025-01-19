import httpService from "../httpService"
import API_ROUTES from "../apiRoutes"


export async function addRating(data) {
    return await httpService.post(API_ROUTES.RATINGS.ADD_RATING, data)
}

export async function getAverageRating() {
    const res = await httpService.get(API_ROUTES.RATINGS.AVERAGE_RATING)
    return res.data.averageRating
}
