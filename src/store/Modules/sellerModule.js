import * as api from "../Services/api"

const state = {
    fields: [
        {key: "seller_full_name", label: "Full Name", sortable: true},
        {key: "seller_first_name", label: "First Name", sortable: true},
        {key: "seller_last_name", label: "Last Name", sortable: true},
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
        {key: "seller_pull_date", label: "Pull Date", sortable: true},
        {key: "seller_upload_date", label: "Upload Date", sortable: true},
        {key: "seller_last_edit_date", label: "Last edit Date", sortable: true},
        {key: "actions", label: "Actions"}
    ],
    sellers: []
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
    }
}

const getters = {
    fields: ({ fields }) => fields,
    sellers: ({ sellers }) => sellers
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
