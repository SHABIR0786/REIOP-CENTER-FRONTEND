import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "ID", sortable: true},
        {key: "seller_id", label: "Seller ID", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},
        {key: "golden_address_address", label: "Golden Address", sortable: true},
        {key: "golden_address_address_line2", label: "Golden Address Line 2", sortable: true},
        {key: "golden_address_city", label: "Golden City", sortable: true},
        {key: "golden_address_state", label: "Golden State", sortable: true},
        {key: "golden_address_zip", label: "Golden Zip", sortable: true},

        // Errors
        {key: "golden_error", label: "Error", sortable: true},
        {key: "golden_error_type", label: "Error Type", sortable: true},

        // Custom Fields

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    goldenAddresses: [],
    total: 0,
    goldenAddress: {},
    filteredGoldenAddress: {},
    filteredGoldenAddressesCount: 0,
}

const mutations = {
    SET_ALL_GOLDEN_ADDRESSES(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.goldenAddresses = JSON.stringify(data);
    },
    EDIT_GOLDEN_ADDRESS(state, payload) {
        const ADDRESS = JSON.parse(state.goldenAddresses)
        const findIndex = ADDRESS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && ADDRESS.splice(findIndex, 1, { ...payload })
        state.goldenAddresses = JSON.stringify(ADDRESS);
    },
    DELETE_GOLDEN_ADDRESS(state, payload) {
        const ADDRESS = JSON.parse(state.goldenAddresses)
        const findIndex = ADDRESS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && ADDRESS.splice(findIndex, 1)
        state.goldenAddresses = JSON.stringify(ADDRESS);
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    FILTER_GOLDEN_ADDRESS(state, payload) {
        const filteredData = [...payload.data]
        if(filteredData?.length > 0) {
        filteredData.forEach(e => {
            // e.list_stack = e.lists.length;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        }
        state.filteredGoldenAddress =JSON.stringify(filteredData);
        state.filteredGoldenAddressesCount =payload.total;
    },
    SET_GOLDEN_ADDRESS(state, payload) {
        state.goldenAddress = {...payload};
    },
    ADD_GOLDEN_ADDRESS(state, payload) {
        const ADDRESS = JSON.parse(state.goldenAddresses)
        const findIndex = ADDRESS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && ADDRESS.splice(findIndex, 1, { ...payload })
        state.goldenAddresses = JSON.stringify(ADDRESS);
    },
    DELETE_MULTIPLE_GOLDEN_ADDRESS(state, payload) {
        const ADDRESS = JSON.parse(state.goldenAddresses)
        const findIndex = ADDRESS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && ADDRESS.splice(findIndex, 1)
        state.goldenAddresses = JSON.stringify(ADDRESS);
    },
    VUEX_STORE(state) {
        state.goldenAddresses = [];
        state.total = 0;
    },
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
    async getGoldenAddress({commit}, data) {
        return await api.get(`/golden-addresses/full/${data}`).then((response) => {
            if (response && response.goldenAddress) {
                commit('SET_GOLDEN_ADDRESS', response.goldenAddress)
            }
            return response
        })
    },
    async filterGoldenAddress({ commit }, data) {
        return await api.post(`/golden-addresses/filter`, {...data}).then((response) => {
            commit('FILTER_GOLDEN_ADDRESS', response.golden_addresses)
            return response
        })
    },
    async editGoldenAddress({ commit }, data) {
        delete data.user_name;
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
    async deleteMultipleGoldenAddress({ commit }, data) {
        return await api.deleteAPI(`/golden-addresses/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_GOLDEN_ADDRESS', data)
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
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

const getters = {
    fields: ({ fields }) => fields,
    goldenAddresses: ({ goldenAddresses }) => {
        if (typeof goldenAddresses === 'string') {
            return JSON.parse(goldenAddresses);
        }
        return [];
    },
    total: ({total}) => total,
    filteredGoldenAddressesCount: ({filteredGoldenAddressesCount}) => filteredGoldenAddressesCount,
    filteredGoldenAddress: ({ filteredGoldenAddress }) => {
        if (typeof filteredGoldenAddress === 'string') {
            return JSON.parse(filteredGoldenAddress);
        }
        return [];
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
