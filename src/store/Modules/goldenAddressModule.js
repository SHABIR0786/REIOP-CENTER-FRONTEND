import * as api from "../Services/api"

const state = {
    fields: [
        {key: "seller", label: "Seller", sortable: true},
        {key: "golden_addresses_address", label: "Golden Address", sortable: true},
        {key: "golden_addresses_city", label: "Golden City", sortable: true},
        {key: "golden_addresses_state", label: "Golden State", sortable: true},
        {key: "golden_addresses_zip", label: "Golden Zip", sortable: true},
        {key: "golden_address_pull_date", label: "Pull Date", sortable: true},
        {key: "golden_address_upload_date", label: "Upload Date", sortable: true},
        {key: "golden_address_last_edit_date", label: "Last Edit Date", sortable: true},
        {key: "actions", label: "Actions"}
    ],
    goldenAddresses: []
}

const mutations = {
    SET_ALL_GOLDEN_ADDRESSES(state, payload) {
        state.goldenAddresses = [...payload]
    },
    EDIT_GOLDEN_ADDRESS(state, payload) {
        const findIndex = state.goldenAddresses.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.goldenAddresses.splice(findIndex, 1, { ...payload })
    },
    DELETE_GOLDEN_ADDRESS(state, payload) {
        const findIndex = state.goldenAddresses.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.goldenAddresses.splice(findIndex, 1)
    }
}

const actions = {
    async getAllGoldenAddresses({ commit, dispatch }, data = 1) {
        return await api.get(`/golden-addresses?page=${data}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.goldenAddresses && response.goldenAddresses.data) {
                commit('SET_ALL_GOLDEN_ADDRESSES', response.goldenAddresses.data)
            }

            return response
        })
    },
    async editGoldenAddress({ commit }, data) {
        return await api.put(`/golden-addresses/${data.id}`, {...data}).then((response) => {
            commit('EDIT_GOLDEN_ADDRESS', data)
            return response
        })
    },
    async deleteGoldenAddress({ commit }, data) {
        return await api.deleteAPI(`/golden-addresses/${data}`).then((response) => {
            commit('DELETE_GOLDEN_ADDRESS', data)
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    goldenAddresses: ({ goldenAddresses }) => goldenAddresses,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
