import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "ID", sortable: true},
        {key:"actions", stickyColumn: true, label: "Actions"},

        {key:"list_total_subject", label: "Total Subjects"},
        {key:"list_total_individual_list", label: "Total Individual Lists"},
        {key:"list_market", label: "Markets", sortable: true},

        {key:"list_group", label: "Group", sortable: true},
        {key:"list_type", label: "Type", sortable: true},
        {key:"list_code", label: "Code", sortable: true},
        {key:"list_source", label: "Source", sortable: true},

        // Custom fields
        {key:"list_pull_date", label: "Last Pull Date", sortable: true},
        {key:"list_upload_date", label: "Upload Date", sortable: true},
        {key:"list_last_edit_date", label: "Last Edit Date", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_id", label: "Uploaded By", sortable: true},
    ],
    lists: [],
    total: 0,
}

const mutations = {
    SET_ALL_LISTS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.lists = [...data]
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
    },
    ADD_LIST(state, payload) {
        const findIndex = state.lists.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.lists.splice(findIndex, 1, { ...payload })
    },
}

const actions = {
    async getAllLists({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/lists?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.lists && response.lists.data) {
                commit('SET_ALL_LISTS', response.lists.data)
            }

            return response
        })
    },
    async searchLists({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/lists?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
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
    async addList({ commit }, data) {
        return await api.post(`/lists`, {...data}).then((response) => {
            commit('ADD_LIST', data)
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
