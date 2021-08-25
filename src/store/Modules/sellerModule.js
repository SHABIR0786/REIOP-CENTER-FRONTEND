import * as api from "../Services/api"

const state = {
    fields: [
        {
            key: "full_name",
            label: "Full Name",
            sortable: true
        },
        {
            key: "first_name",
            label: "First Name",
            sortable: true
        },
        {
            key: "last_name",
            label: "Last Name",
            sortable: true
        },
        {
            key: "middle_name",
            label: "Middle Name",
            sortable: true
        },
        {
            key: "mailing_address",
            label: "Mailing Address"
        },
        {
            key: "mailing_state",
            label: "Mailing State"
        },
        {
            key: "mailing_city",
            label: "Mailing City"
        },
        {
            key: "mailing_zip",
            label: "Mailing Zip"
        },
        {
            key: "company_owned",
            label: "Company Owned"
        },
        {
            key: "total_seller",
            label: "Total Seller"
        },
        {
            key: "actions",
            label: "Actions"
        }
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
