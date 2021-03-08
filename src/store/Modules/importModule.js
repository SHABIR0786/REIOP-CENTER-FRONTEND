export const state = {
    cards: [
        {
            text: "Main Data Upload",
        },
        {
            text: "Seller Email",
        },
        {
            text: "Seller Phone Number",
        },
        {
            text: "Seller Golden Address",
        },
        {
            text: "Phone Validity",
        },
        {
            text: "Email Validity",
        }
    ]
}

export const mutations = {

}

export const actions = {

}

export const getters = {
    cards: ({ cards }) => cards,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}