import * as api from "../Services/api"
const state = {
    headers: [
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
            label: "Mailing Address"
        },
        {
            key: "mailing_state",
            label: "Mailing Address"
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
    }
}

const actions = {
    async getAllSellers({ commit }) {
        return await api.get('/seller/')
        .then((response) => {
            commit('SET_ALL_SELLERS', response)
            return response
        })
    }
}

const getters = {
    headers: ({ headers }) => headers,
    sellers: ({ sellers }) => sellers
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}