import * as api from "../Services/api"

const state = {
    fields: [
        {key: "seller", label: "Seller", sortable: true},
        {key: "email_address", label: "Email Address", sortable: true},
        {key: "email_validity", label: "Email validity", sortable: true},
        {key: "email_skip_source", label: "Skip Source", sortable: true},
        {key: "email_pull_date", label: "Pull Date", sortable: true},
        {key: "email_upload_date", label: "Upload date", sortable: true},
        {key: "email_last_edit_date", label: "Last Edit Date date", sortable: true},
        {key: "actions", label: "Actions"}
    ],
    emails: []
}

const mutations = {
    SET_ALL_EMAILS(state, payload) {
        state.emails = [...payload]
    },
    EDIT_EMAIL(state, payload) {
        const findIndex = state.emails.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.emails.splice(findIndex, 1, { ...payload })
    },
    DELETE_EMAIL(state, payload) {
        const findIndex = state.emails.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.emails.splice(findIndex, 1)
    }
}

const actions = {
    async getAllEmails({ commit, dispatch }, data = 1) {
        return await api.get(`/emails?page=${data}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.emails && response.emails.data) {
                commit('SET_ALL_EMAILS', response.emails.data)
            }

            return response
        })
    },
    async editEmail({ commit }, data) {
        return await api.put(`/emails/${data.id}`, {...data}).then((response) => {
            commit('EDIT_EMAIL', data)
            return response
        })
    },
    async deleteEmail({ commit }, data) {
        return await api.deleteAPI(`/emails/${data}`).then((response) => {
            commit('DELETE_EMAIL', data)
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    emails: ({ emails }) => emails
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
