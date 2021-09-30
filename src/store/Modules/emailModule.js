import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", stickyColumn: true, label: "Id", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},
        {key: "seller", stickyColumn: true, label: "Seller", sortable: true},
        {key: "email_address", label: "Email Address", sortable: true},
        {key: "email_validity", label: "Email validity", sortable: true},
        {key: "email_skip_source", label: "Skip Source", sortable: true},
    ],
    emails: [],
    total: 0,
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
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    }
}

const actions = {
    async getAllEmails({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/emails?page=${page}&perPage=${perPage}`).then((response) => {
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
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/emails`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    emails: ({ emails }) => emails,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
