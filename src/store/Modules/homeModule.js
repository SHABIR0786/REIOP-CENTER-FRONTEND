import * as api from "../Services/api"
import { CARDS_ENUM } from '../../utils/enum/cards';

export const state = {
    cards: [
        {icon: "house-fill", path: "/subjects", text: "Total Subjects", variant: "warning", counter: 0, isVisible: true},
        {icon: "person-circle", path: "/sellers", text: "Total Sellers", variant: "secondary", counter: 0, isVisible: true},
        {icon: "envelope-fill", path: "/emails", text: "Total Emails", variant: "danger", counter: 0, isVisible: true},
        {icon: "telephone-fill", path: "/phones", text: "Total Phones", variant: "info", counter: 0, isVisible: true},
        {icon: "key-fill", path: "/golden-addresses", text: "Total Addresses", variant: "success", counter: 0, isVisible: true},
        {icon: "key-fill", path: "/lists", text: "Lists", variant: "success", counter: 0, isVisible: false}
    ],
    importsCards: [
        {icon: "house-fill", path: "/subjects", text: "Total Subjects", variant: "warning", counter: 0, isVisible: true},
        {icon: "person-circle", path: "/sellers", text: "Total Sellers", variant: "secondary", counter: 0, isVisible: true},
        {icon: "envelope-fill", path: "/emails", text: "Total Emails", variant: "danger", counter: 0, isVisible: true},
        {icon: "telephone-fill", path: "/phones", text: "Total Phones", variant: "info", counter: 0, isVisible: true},
        {icon: "key-fill", path: "/golden-addresses", text: "Total Addresses", variant: "success", counter: 0, isVisible: true},
        {icon: "key-fill", path: "/lists", text: "Lists", variant: "success", counter: 0, isVisible: false}
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
            state.cards[CARDS_ENUM.LISTS].counter = payload.lists || 0
        }
    },
    SET_TOTAL_IMPORTS_ROWS(state, payload) {
        if (payload) {
            state.importsCards[CARDS_ENUM.SUBJECTS].counter = payload.subjects || 0
            state.importsCards[CARDS_ENUM.SELLERS].counter = payload.sellers || 0
            state.importsCards[CARDS_ENUM.EMAILS].counter = payload.emails || 0
            state.importsCards[CARDS_ENUM.PHONES].counter = payload.phones || 0
            state.importsCards[CARDS_ENUM.GOLDEN_ADDRESS].counter = payload.golden_addresses || 0
            state.importsCards[CARDS_ENUM.LISTS].counter = payload.lists || 0
        }
    },
    VUEX_STORE() {
    },
}

export const actions = {
    async getTotalRows({ commit, dispatch }) {
        return await api.get('/home').then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            commit('SET_TOTAL_ROWS', response)
            return response
        })
    },
    async getTotalImportsRows({ commit, dispatch }, data) {
        return await api.post('/home/importsCounts', {...data}).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            commit('SET_TOTAL_IMPORTS_ROWS', response)
            return response
        })
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

export const getters = {
    cards: ({ cards }) => cards,
    importsCards: ({ importsCards }) => importsCards
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
