import * as api from "../Services/api"

export const state = {
    cards: [
        {
            icon: "house-fill",
            path: "/subject",
            text: "Total Subjects",
            variant: "warning",
            counter: 97997
        },
        {
            icon: "person-circle",
            path: "/seller",
            text: "Total Sellers",
            variant: "secondary",
            counter: 122485
        },
        {
            icon: "envelope-fill",
            path: "/email",
            text: "Total Emails",
            variant: "danger",
            counter: 0
        },
        {
            icon: "telephone-fill",
            path: "/phone",
            text: "Total Phones",
            variant: "info",
            counter: 100350
        },
        {
            icon: "key-fill",
            path: "/golden-address",
            text: "Total Addresses",
            variant: "success",
            counter: 0
        }
    ],
}

export const mutations = {
    SET_TOTAL_ROWS(state, payload) {
        state.cards[0].counter = payload.subject
        state.cards[1].counter = payload.seller
        state.cards[2].counter = payload.email
        state.cards[3].counter = payload.phone
        state.cards[4].counter = payload.golden
    }
}

export const actions = {
    async getTotalRows({ commit }) {
        return await api.get('/home')
        .then((response) => {
            commit('SET_TOTAL_ROWS', response)
            return response
        })
    },
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