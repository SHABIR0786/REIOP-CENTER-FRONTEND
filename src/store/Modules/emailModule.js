import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "ID", sortable: true},
        {key: "seller_id",label: "Seller ID", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},

        {key: "email_address", label: "Email Address", sortable: true},
        {key: "email_validity", label: "Email Validity", sortable: true},
        {key: "email_skip_source", label: "Skip Source", sortable: true},

        // Errors
        {key: "error", label: "Error", sortable: true},
        {key: "error_type", label: "Error Type", sortable: true},

        // Custom Fields
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    emails: [],
    total: 0,
}

const mutations = {
    SET_ALL_EMAILS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.emails = JSON.stringify(data);
    },
    EDIT_EMAIL(state, payload) {
        const EMAIL = JSON.parse(state.emails)
        const findIndex = EMAIL.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && EMAIL.splice(findIndex, 1, { ...payload })
        state.emails = JSON.stringify(EMAIL);
    },
    DELETE_EMAIL(state, payload) {
        const EMAIL = JSON.parse(state.emails)
        const findIndex = EMAIL.findIndex(({ id }) => id === payload)
        findIndex !== -1 && EMAIL.splice(findIndex, 1)
        state.emails = JSON.stringify(EMAIL);
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_EMAIL(state, payload) {
        const EMAIL = JSON.parse(state.emails)
        const findIndex = EMAIL.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && EMAIL.splice(findIndex, 1, { ...payload })
        state.emails = JSON.stringify(EMAIL);
    },
    DELETE_MULTIPLE_EMAILS(state, payload) {
        const EMAIL = JSON.parse(state.emails)
        const findIndex = EMAIL.findIndex(({ id }) => id === payload)
        findIndex !== -1 && EMAIL.splice(findIndex, 1)
        state.emails = JSON.stringify(EMAIL);
    },
    VUEX_STORE(state) {
        state.emails = [];
        state.total = 0;
    },
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
    async searchEmails({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/emails?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
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
        delete data.user_name;
        return await api.put(`/emails/${data.id}`, {...data}).then((response) => {
            commit('EDIT_EMAIL', data)
            return response
        })
    },
    async addEmail({ commit }, data) {
        return await api.post(`/emails`, {...data}).then((response) => {
            commit('ADD_EMAIL', data)
            return response
        })
    },
    async deleteEmail({ commit }, data) {
        return await api.deleteAPI(`/emails/${data}`).then((response) => {
            commit('DELETE_EMAIL', data)
            return response
        })
    },
    async deleteMultipleEmails({ commit }, data) {
        return await api.deleteAPI(`/emails/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_EMAILS', data)
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
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

const getters = {
    fields: ({ fields }) => fields,
    emails: ({ emails }) => {
        if (typeof emails === 'string') {
            return JSON.parse(emails);
        }

        return [];
    },
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
