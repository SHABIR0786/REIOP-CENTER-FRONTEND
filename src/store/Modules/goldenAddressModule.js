import * as api from "../Services/api"

const state = {
    goldenHeaders: [
        {
            key: "seller",
            label: "Seller",
            sortable: true
        },
        {
            key: "golden_address",
            label: "Golden Address",
            sortable: true
        },
        {
            key: "golden_city",
            label: "Golden City",
            sortable: true
        },
        {
            key: "golden_state",
            label: "Golden State",
            sortable: true
        },
        {
            key: "golden_zip",
            label: "Golden Zip",
            sortable: true
        },
    ],
    goldenAddresses: []
}

const mutations = {
    SET_ALL_GOLDEN_ADDRESSES(state, payload) {
        state.goldenAddresses = [...payload]
    },
    EDIT_GOLDEN_ADDRESS(state, payload) {
        const findIndex = state.goldenAddresses.findIndex(({ id }) => id === payload.id)
        findIndex && state.goldenAddresses.splice(findIndex, 1, { ...payload })
    },
    DELETE_GOLDEN_ADDRESS(state, payload) {
        const findIndex = state.goldenAddresses.findIndex(({ id }) => id === payload)
        findIndex && state.goldenAddresses.splice(findIndex, 1)
    }
}

const actions = {
    async getAllGoldenAddresses({ commit }) {
        return await api.get('/golden-address')
        .then((response) => {
            commit('SET_ALL_GOLDEN_ADDRESSES', response)
            return response
        })
    },
    async editGoldenAddress({ commit }, data) {
        return await api.put('/golden-address/', {...data})
        .then((response) => {
            console.log(response, 'response')
            commit('EDIT_GOLDEN_ADDRESS', data)
            return response
        })
    },
    async deleteGoldenAddress({ commit }, data) {
        return await api.deleteAPI(`/golden-address/${data}`)
        .then((response) => {
            console.log(response, 'response')
            commit('DELETE_GOLDEN_ADDRESS', data)
            return response
        })
    }
}

const getters = {
    goldenHeaders: ({ goldenHeaders }) => goldenHeaders,
    goldenAddresses: ({ goldenAddresses }) => goldenAddresses,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}