import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "ID", sortable: true},
        {key: "seller_id", label: "Seller ID", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},

        {key: "golden_address_address", label: "Golden Address", sortable: true},
        {key: "golden_address_address_line2", label: "Golden Address Line 2", sortable: true},
        {key: "golden_address_city", label: "Golden City", sortable: true},
        {key: "golden_address_state", label: "Golden State", sortable: true},
        {key: "golden_address_zip", label: "Golden Zip", sortable: true},

        // Custom Fields

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_id", label: "Uploaded By", sortable: true},
    ],
    goldenAddresses: [],
    total: 0,
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
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_GOLDEN_ADDRESS(state, payload) {
        const findIndex = state.goldenAddresses.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.goldenAddresses.splice(findIndex, 1, { ...payload })
    }
}

const actions = {
    async getAllGoldenAddresses({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/golden-addresses?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.goldenAddresses && response.goldenAddresses.data) {
                commit('SET_ALL_GOLDEN_ADDRESSES', response.goldenAddresses.data)
            }

            return response
        })
    },
    async searchGoldenAddresses({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/golden-addresses?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
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
    async addGoldenAddress({ commit }, data) {
        return await api.post(`/golden-addresses`, {...data}).then((response) => {
            commit('ADD_GOLDEN_ADDRESS', data)
            return response
        })
    },
    async deleteGoldenAddress({ commit }, data) {
        return await api.deleteAPI(`/golden-addresses/${data}`).then((response) => {
            commit('DELETE_GOLDEN_ADDRESS', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/golden-addresses`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    goldenAddresses: ({ goldenAddresses }) => goldenAddresses,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
