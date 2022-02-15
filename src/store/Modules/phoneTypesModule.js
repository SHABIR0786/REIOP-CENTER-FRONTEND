import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "type_in_file", label: "Type In File", sortable: true},
        {key: "type_in_web", label: "Type In Web", sortable: true},
        {key: "user_name", label: "Uploaded By"},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
    ],
    types: [],
    total: 0,
}

const mutations = {
    SET_ALL_TYPES(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        });

        state.types = [...data]
    },
    EDIT_TYPE(state, payload) {
        const findIndex = state.types.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.types.splice(findIndex, 1, { ...payload })
    },
    DELETE_TYPE(state, payload) {
        const findIndex = state.types.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.types.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_TYPE(state, payload) {
        const findIndex = state.types.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.types.splice(findIndex, 1, { ...payload })
    },
}

const actions = {
    async getAllTypes({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/types?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.types && response.types.data) {
                commit('SET_ALL_TYPES', response.types.data)
            }

            return response
        })
    },
    async searchType({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/types?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.types && response.types.data) {
                commit('SET_ALL_TYPES', response.types.data)
            }

            return response
        })
    },
    async editType({ commit }, data) {
        return await api.put(`/types/${data.id}`, {...data}).then((response) => {
            commit('EDIT_TYPE', data)
            return response
        })
    },
    async addType({ commit }, data) {
        return await api.post(`/types`, {...data}).then((response) => {
            commit('ADD_TYPE', data)
            return response
        })
    },
    async deleteType({ commit }, data) {
        return await api.deleteAPI(`/types/${data}`).then((response) => {
            commit('DELETE_TYPE', data)
            return response
        })
    },

    async getTotal({ commit }) {
        return await api.get(`/totals/types`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    types: ({ types }) => types,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
