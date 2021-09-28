import * as api from "../Services/api"

const state = {
    fields: [
        {key: "seller_full_name", stickyColumn: true, label: "Full Name", sortable: true},
        {key: "seller_first_name", stickyColumn: true, label: "First Name", sortable: true},
        {key: "seller_last_name", stickyColumn: true, label: "Last Name", sortable: true},
        {key: "seller_middle_name", label: "Middle Name", sortable: true},
        {key: "seller_mailing_address", label: "Mailing Address"},
        {key: "seller_mailing_state", label: "Mailing State"},
        {key: "seller_mailing_city", label: "Mailing City"},
        {key: "seller_mailing_zip", label: "Mailing Zip"},
        {key: "seller_company_owned", label: "Company Owned"},
        {key: "seller_full_mailing_address", label: "Full Mailing Address"},
        {key: "seller_full_mailing_city", label: "Full Mailing City"},
        {key: "seller_full_mailing_state", label: "Full Mailing State"},
        {key: "seller_full_mailing_zip", label: "Full Mailing Zip"},
        {key: "actions", label: "Actions"}
    ],
    sellers: [],
    total: 0,
}

const mutations = {
    SET_ALL_SELLERS(state, payload) {
        state.sellers = [...payload]
    },
    EDIT_SELLER(state, payload) {
        const findIndex = state.sellers.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.sellers.splice(findIndex, 1, { ...payload })
    },
    DELETE_SELLER(state, payload) {
        const findIndex = state.sellers.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.sellers.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    }
}

const actions = {
    async getAllSellers({ commit }, data = 1) {
        return await api.get(`/sellers?page=${data}`).then((response) => {
            if (response && response.sellers && response.sellers.data) {
                commit('SET_ALL_SELLERS', response.sellers.data)
            }

            return response
        })
    },
    async editSeller({ commit }, data) {
        return await api.put(`/sellers/${data.id}`, {...data}).then((response) => {
            commit('EDIT_SELLER', data)
            return response
        })
    },
    async deleteSeller({ commit }, data) {
        return await api.deleteAPI(`/sellers/${data}`).then((response) => {
            commit('DELETE_SELLER', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/sellers`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    sellers: ({ sellers }) => sellers,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
