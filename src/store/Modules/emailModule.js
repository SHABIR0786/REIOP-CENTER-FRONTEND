import * as api from "../Services/api"

const state = {    
    emailHeaders: [
        {
            key: "seller",
            label: "Seller",
            sortable: true
        },
        {
            key: "email_address",
            label: "Email Address",
            sortable: true
        },
        {
            key: "email_validity",
            label: "Email validity",
            sortable: true
        },
        {
            key: "skip_source",
            label: "Skip Source",
            sortable: true
        },
        {
            key: "actions",
            label: "Actions"
        }
    ],
    emails: []
}

const mutations = {
    SET_ALL_EMAILS(state, payload) {
        state.emails = [...payload]
    },
    EDIT_EMAIL(state, payload) {
        const findIndex = state.emails.findIndex(({ id }) => id === payload.id)
        findIndex && state.emails.splice(findIndex, 1, { ...payload })
    },
    DELETE_EMAIL(state, payload) {
        const findIndex = state.emails.findIndex(({ id }) => id === payload)
        findIndex && state.emails.splice(findIndex, 1)
    }
}

const actions = {
    async getAllEmails({ commit }) {
        return await api.get('/email-address')
        .then((response) => {
            commit('SET_ALL_EMAILS', response)
            return response
        })
    },
    async editEmail({ commit }, data) {
        return await api.put('/email-address/', {...data})
        .then((response) => {
            commit('EDIT_EMAIL', data)
            return response
        })
    },
    async deleteEmail({ commit }, data) {
        return await api.deleteAPI(`/email-address/${data}`)
        .then((response) => {
            commit('DELETE_EMAIL', data)
            return response
        })
    }
}

const getters = {
    emailHeaders: ({ emailHeaders }) => emailHeaders,
    emails: ({ emails }) => emails
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}