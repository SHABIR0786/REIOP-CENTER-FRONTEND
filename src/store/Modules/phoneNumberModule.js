import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "ID", sortable: true},
        {key: "seller_id", label: "Seller ID", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},

        {key: "phone_number", label: "Phone Number", sortable: true},
        {key: "phone_type", label: "Phone Type", sortable: true},
        {key: "phone_validity", label: "Phone Validity", sortable: true},
        {key: "phone_skip_source", label: "Phone Skip Source"},

        // Errors
        {key: "phone_error", label: "Error", sortable: true},
        {key: "phone_error_type", label: "Error Type", sortable: true},

        // Custom Fields
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    phoneNumbers: [],
    total: 0,
}

const mutations = {
    SET_ALL_ITEMS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.phoneNumbers = JSON.stringify(data);
    },
    EDIT_ITEM(state, payload) {
        const PHONE = JSON.parse(state.phoneNumbers)
        const findIndex = PHONE.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && PHONE.splice(findIndex, 1, { ...payload })
    },
    DELETE_ITEM(state, payload) {
        const PHONE = JSON.parse(state.phoneNumbers)
        const findIndex = PHONE.findIndex(({ id }) => id === payload)
        findIndex !== -1 && PHONE.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_ITEM(state, payload) {
        const PHONE = JSON.parse(state.phoneNumbers)
        const findIndex = PHONE.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && PHONE.splice(findIndex, 1, { ...payload })
    },
    DELETE_MULTIPLE_ITEMS(state, payload) {
        const PHONE = JSON.parse(state.phoneNumbers)
        const findIndex =PHONE.findIndex(({ id }) => id === payload)
        findIndex !== -1 && PHONE.splice(findIndex, 1)
    }
}

const actions = {
    async getAllPhoneNumbers({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/phones?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.phones && response.phones.data) {
                commit('SET_ALL_ITEMS', response.phones.data)
            }

            return response
        })
    },
    async searchPhoneNumbers({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/phones?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.phones && response.phones.data) {
                commit('SET_ALL_ITEMS', response.phones.data)
            }

            return response
        })
    },
    async editPhoneNumber({ commit }, data) {
        delete data.user_name;
        return await api.put(`/phones/${data.id}`, {...data}).then((response) => {
            commit('EDIT_ITEM', data)
            return response
        })
    },
    async addPhoneNumber({ commit }, data) {
        return await api.post(`/phones`, {...data}).then((response) => {
            commit('ADD_ITEM', data)
            return response
        })
    },
    async deletePhoneNumber({ commit }, data) {
        return await api.deleteAPI(`/phones/${data}`).then((response) => {
            commit('DELETE_ITEM', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/phones`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    async deleteMultiplePhoneNumber({ commit }, data) {
        return await api.deleteAPI(`/phones/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_ITEMS', data)
            return response
        })
    },
}

const getters = {
    fields: ({ fields }) => fields,
    phoneNumbers: ({ phoneNumbers }) => {
        if (typeof phoneNumbers === 'string') {
            return JSON.parse(phoneNumbers);
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
