import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", stickyColumn: true, label: "ID", sortable: true},
        {key: "seller_id", stickyColumn: true, label: "Seller ID", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},

        {key: "phone_number", label: "Phone Number", sortable: true},
        {key: "phone_type", label: "Phone Type", sortable: true},
        {key: "phone_validity", label: "Phone Validity", sortable: true},
        {key: "phone_skip_source", label: "Phone Skip Source"},

        // Custom Fields

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_id", label: "Uploaded By", sortable: true},
    ],
    phoneNumbers: [],
    total: 0,
}

const mutations = {
    SET_ALL_ITEMS(state, payload) {
        state.phoneNumbers = [...payload]
    },
    EDIT_ITEM(state, payload) {
        const findIndex = state.phoneNumbers.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.phoneNumbers.splice(findIndex, 1, { ...payload })
    },
    DELETE_ITEM(state, payload) {
        const findIndex = state.phoneNumbers.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.phoneNumbers.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
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
    async editPhoneNumber({ commit }, data) {
        return await api.put(`/phones/${data.id}`, {...data}).then((response) => {
            commit('EDIT_ITEM', data)
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
    }
}

const getters = {
    fields: ({ fields }) => fields,
    phoneNumbers: ({ phoneNumbers }) => phoneNumbers,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
