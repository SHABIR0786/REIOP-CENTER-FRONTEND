import * as api from "../Services/api"

const state = {
    fields: [
        {key: "actions", label: "Actions"},
        {key:"id", stickyColumn: true, label: "Id", sortable: true},
        {key:"list_type", stickyColumn: true, label: "List Type", sortable: true},
        {key:"list_group", stickyColumn: true, label: "Group", sortable: true},
        {key:"list_code", label: "Code", sortable: true},
        {key:"list_source", label: "Source", sortable: true},
        {key:"list_stack", label: "Stack", sortable: true},
        {key:"list_run_month", label: "Run Month", sortable: true},
        {key:"list_run_year", label: "Run Year", sortable: true},
    ],
    lists: [],
    total: 0,
}

const mutations = {
    SET_ALL_LISTS(state, payload) {
        state.lists = [...payload]
    },
    EDIT_LIST(state, payload) {
        const findIndex = state.lists.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.lists.splice(findIndex, 1, { ...payload })
    },
    DELETE_LIST(state, payload) {
        const findIndex = state.lists.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.lists.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    }
}

const actions = {
    async getAllLists({ commit, dispatch }, data = 1) {
        return await api.get(`/lists?page=${data}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.lists && response.lists.data) {
                commit('SET_ALL_LISTS', response.lists.data)
            }

            return response
        })
    },
    async editList({ commit }, data) {
        return await api.put(`/lists/${data.id}`, {...data}).then((response) => {
            commit('EDIT_LIST', data)
            return response
        })
    },
    async deleteList({ commit }, data) {
        return await api.deleteAPI(`/lists/${data}`).then((response) => {
            commit('DELETE_LIST', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/lists`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    lists: ({ lists }) => lists,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
