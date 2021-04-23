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
        findIndex && state.sellers.splice(findIndex, 1, { ...payload })
    },
    DELETE_SELLER(state, payload) {
        const findIndex = state.sellers.findIndex(({ id }) => id === payload)
        findIndex && state.sellers.splice(findIndex, 1)
    }
}

const actions = {
    async getAllSellers({ commit }) {
        return await api.get('/seller')
        .then((response) => {
            commit('SET_ALL_SELLERS', response)
            return response
        })
    },
    async editSeller({ commit }, data) {
        return await api.put('/seller/', {...data})
        .then((response) => {
            console.log(response, 'response')
            commit('EDIT_SELLER', data)
            return response
        })
    },
    async deleteSeller({ commit }, data) {
        return await api.deleteAPI(`/seller/${data}`)
        .then((response) => {
            console.log(response, 'response')
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