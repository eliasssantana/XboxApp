export const Api = {
    baseUrl: "http://localhost:5000",
    loginUrl: () => Api.baseUrl + "/login",
    createUserUrl: () => Api.baseUrl + "/users",
    addGameUrl: () => Api.baseUrl + "/game",
    readAllGamesUrl: () => Api.baseUrl + "/game",
    readByIdUrl: id => Api.baseUrl + `/game/${id}`,
    updateGameUrl: id => Api.baseUrl + `/game/${id}`,

    readProfileUrl: () => Api.baseUrl + "/profile",
    readProfileId: (id) => Api.baseUrl + `/profile/${id}`,
    createProfileUrl: () => Api.baseUrl + "/profile",

    readGenreUrl: () => Api.baseUrl + "/genre",
    readGenreId: id => Api.baseUrl + `/genre/${id}`
}