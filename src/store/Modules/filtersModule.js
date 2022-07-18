import * as api from "../Services/api";

const state = {
    filters: []
}

const mutations = {
    ADD_FILTER(state, payload) {
        const findIndex = state.filters.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.filters.splice(findIndex, 1, { ...payload })
    },
    FILTERS_LIST(state, payload) {
        state.filters = payload
    },
    EDIT_FILTERS(state, payload) {
        const findIndex = state.filters.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.filters.splice(findIndex, 1, { ...payload })
    }  
};

const actions = {
    async getAllFilters({ commit, dispatch }, type) {
        return await api.get(`/filters?type=${type}`).then((response) => {
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
 };

const getters = {
    filters: ({ filters }) => filters,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
