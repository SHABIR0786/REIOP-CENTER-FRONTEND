import * as api from "../Services/api";
const state = {
    fields: [
        { key: "id", label: "Id", sortable: true},
        { key: "name", label: "Filter Name", sortable: true},
        { key: "filter_type", lable: "Filter Type", sortable: false},
        { key: "permission", label: "Permission Level", sortable: false},
        { key: "user_name", label: "Created By", sortable: true},
        { key: "remove", label: "Remove", sortable: false},
    ],
    filters: [],
    items: [],
    totalItems: 0,
}

const mutations = {
    ADD_FILTER(state, payload) {
        const findIndex = state.filters.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.filters.splice(findIndex, 1, { ...payload })
    },
    FILTER_ITEMS(state, payload) {
        state.items = payload.data;
        state.totalItems = payload.total;
    },
    FILTERS_LIST(state, payload) {
        state.filters = payload
    },
    EDIT_FILTERS(state, payload) {
        const findIndex = state.filters.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.filters.splice(findIndex, 1, { ...payload })
    },
    DELETE_FILTER(state, payload) {
        const FILTERS = state.filters
        const findIndex = FILTERS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && FILTERS.splice(findIndex, 1)
        state.filters = FILTERS;

        const FILTERS_ITEMS = state.items;
        const findIndexItem = FILTERS_ITEMS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && FILTERS_ITEMS.splice(findIndexItem, 1)
        state.items = FILTERS_ITEMS;
        state.totalItems = state.totalItems - 1;
    },
    UPDATE_FILTER(state, payload) {
        console.log(state,payload);
    }
};

const actions = {
    async getFilters({commit, dispatch}, {type, page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/filters?type=${type}&page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.filters) {
                commit('FILTER_ITEMS', response.filters)
            }
            return response
        })
    },
    async deleteFilter({ commit }, data) {
        return await api.deleteAPI(`/filters/${data}`).then((response) => {
            commit('DELETE_FILTER', data)
            return response
        })
    },

    async getAllFilters({ commit, dispatch }, type) {
        return await api.get(`/filters/getAllFilters?type=${type}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.filters) {
                commit('FILTERS_LIST', response.filters)
            }

            return response
        })
    },
    async editFilter({ commit }, data) {
        delete data.user_name;
        return await api.put(`/filters/${data.id}`, {...data}).then((response) => {
            commit('EDIT_FILTERS', data)
            return response
        })
    },
    async createFilter({ commit }, data) {
        return await api.post(`/filters`, {...data}).then((response) => {
            commit('ADD_FILTER', data)
            return response
        })
    },
    async changePermission({ commit }, data) {
        return await api.post(`/filters/changePermission`, {...data}).then((response) => {
            commit('UPDATE_FILTER',data);
            return response
        })
    },
    async changeFilterType({ commit }, data) {
        return await api.post(`/filters/changeFilterType`, {...data}).then((response) => {
            commit('UPDATE_FILTER',data);
            return response
        })
    },
 };

const getters = {
    filters: ({ filters }) => filters,
    fields: ({ fields }) => fields,
    items: ({ items }) => items,
    totalItems: ({ totalItems }) => totalItems,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
