import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Id", sortable: true},
        {key:"actions", label: "Actions"},
        {key: "name", label: "Name", sortable: true},
        {key: "plan", label: "Plan", sortable: true},
        {key: "number_of_users", label: "No. of Users", sortable: true},
        {key: "number_of_teams", label: "No. of Teams", sortable: true},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
    ],
    companies: [],
    total: 0,
    company:{}
}

const mutations = {
    SET_ALL_COMPANIES(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            if(e.created_at) {
            e.created_at = e.created_at.split('T')[0];
            }
            if(e.updated_at) {
            e.updated_at = e.updated_at.split('T')[0];
        }
        })
        state.total = data.length;
        state.companies = [...data]
    },
    EDIT_COMPANY(state, payload) {
        const findIndex = state.companies.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.companies.splice(findIndex, 1, { ...payload })
    },
    DELETE_COMPANY(state, payload) {
        const findIndex = state.companies.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.companies.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_COMPANY(state, payload) {
        state.companies.push(payload);
        // const findIndex = state.companies.findIndex(({ id }) => id === payload.id)
        // findIndex !== -1 && state.companies.splice(findIndex, 1, { ...payload })
    },
    SET_COMPANY(state, payload) {
        state.company =payload.company;
    },
}

const actions = {
    async getAllCompanies({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/companies?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if(response && response.companies && response.companies.data) {
                commit('SET_ALL_COMPANIES', response.companies.data)
            }

            return response.companies.data;
        })
    },
    async searchCompanies({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/companies?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.companies && response.companies.data) {
                commit('SET_ALL_COMPANIES', response.companies.data)
            }
            return response
        })
    },
    async editCompany({ commit }, data) {
        delete data.companies;
        delete data.total_companies;
        return await api.put(`/companies/${data.id}`, {...data}).then((response) => {
            commit('EDIT_COMPANY', data)
            return response
        })
    },
    async addCompany({ commit }, data) {
        return await api.post(`/companies`, {...data}).then((response) => {
            if(response.success){commit('ADD_COMPANY', response.company)}
            return response;
        })
    },
    async deleteCompany({ commit }, data) {
        return await api.deleteAPI(`/companies/${data}`).then((response) => {
            commit('DELETE_COMPANY', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/companies`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    async getCompany({commit}, data) {        
        return await api.get(`/companies/${data}`).then((response) => {
            if (response ) {                
                commit('SET_COMPANY', response)
            }
            return response
        })
    },
}

const getters = {
    fields: ({ fields }) => fields,
    companies: ({ companies }) => companies,
    company: ({ company }) => company,
    total: ({total}) => total,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
