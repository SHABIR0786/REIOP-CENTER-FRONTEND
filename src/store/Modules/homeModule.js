import * as api from "../Services/api"
import { CARDS_ENUM } from '../../utils/enum/cards';

export const state = {
    cards: [
        {icon: "house-fill", path: "/subjects", text: "Total Subjects", variant: "warning", counter: 0},
        {icon: "person-circle", path: "/sellers", text: "Total Sellers", variant: "secondary", counter: 0},
        {icon: "envelope-fill", path: "/emails", text: "Total Emails", variant: "danger", counter: 0},
        {icon: "telephone-fill", path: "/phones", text: "Total Phones", variant: "info", counter: 0},
        {icon: "key-fill", path: "/golden-addresses", text: "Total Addresses", variant: "success", counter: 0}
    ],
}

export const mutations = {
    SET_TOTAL_ROWS(state, payload) {
        if (payload) {
            state.cards[CARDS_ENUM.SUBJECTS].counter = payload.subjects || 0
            state.cards[CARDS_ENUM.SELLERS].counter = payload.sellers || 0
            state.cards[CARDS_ENUM.EMAILS].counter = payload.emails || 0
            state.cards[CARDS_ENUM.PHONES].counter = payload.phones || 0
            state.cards[CARDS_ENUM.GOLDEN_ADDRESS].counter = payload.golden_addresses || 0
        }
    }
}

export const actions = {
    async getTotalRows({ commit }) {
        return await api.get('/home').then((response) => {
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
