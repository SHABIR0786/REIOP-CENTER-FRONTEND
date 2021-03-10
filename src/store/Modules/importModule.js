export const state = {
    cards: [
        {
            id: "main",
            text: "Main Data Upload",
        },
        {
            id: "email",
            text: "Seller Email",
        },
        {
            id: "phone",
            text: "Seller Phone Number",
        },
        {
            id: "address",
            text: "Seller Golden Address",
        },
        {
            id: "phone_validity",
            text: "Phone Validity",
        },
        {
            id: "email_validity",
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