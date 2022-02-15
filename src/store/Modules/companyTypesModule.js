import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "company_type", label: "Company Type", sortable: true},
        {key: "user_name", label: "Uploaded By"},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
    ],
    companyTypes: [],
    total: 0,
}

const mutations = {
    SET_ALL_TYPES(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        });

        state.companyTypes = [...data]
    },
    EDIT_TYPE(state, payload) {
        const findIndex = state.companyTypes.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.companyTypes.splice(findIndex, 1, { ...payload })
    },
    DELETE_TYPE(state, payload) {
        const findIndex = state.companyTypes.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.companyTypes.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_TYPE(state, payload) {
        const findIndex = state.companyTypes.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.companyTypes.splice(findIndex, 1, { ...payload })
        const data = [payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        });
        state.companyTypes.push(data[0])
    },
}

const actions = {
    async getAllTypes({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/companyTypes?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.companyTypes && response.companyTypes.data) {
                commit('SET_ALL_TYPES', response.companyTypes.data)
            }

            return response
        })
    },
    async searchType({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/companyTypes?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.companyTypes && response.companyTypes.data) {
                commit('SET_ALL_TYPES', response.companyTypes.data)
            }

            return response
        })
    },
    async editType({ commit }, data) {
        return await api.put(`/companyTypes/${data.id}`, {...data}).then((response) => {
            commit('EDIT_TYPE', data)
            return response
        })
    },
    async addType({ commit }, data) {
        return await api.post(`/companyTypes`, {...data}).then((response) => {
            commit('ADD_TYPE', response.companyTypes)
            return response
        })
    },
    async deleteType({ commit }, data) {
        return await api.deleteAPI(`/companyTypes/${data}`).then((response) => {
            commit('DELETE_TYPE', data)
            return response
        })
    },

    async getTotal({ commit }) {
        return await api.get(`/totals/companyTypes`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    companyTypes: ({ companyTypes }) => companyTypes,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
