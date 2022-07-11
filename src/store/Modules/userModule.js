import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "team_id", label: "Team Id"},
        {key: "name", label: "Name", sortable: true},
        {key: "email", label: "email", sortable: true},
        {key: "role", label: "Role", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key: "company_role", label: "Company"},
        {key:"actions", label: "Actions"},
    ],
    users: [],
    total_users: 0,
}

const mutations = {
    SET_ALL_USERS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            if(e.created_at) {
            e.created_at = e.created_at.split('T')[0];
            }
            if(e.updated_at) {
            e.updated_at = e.updated_at.split('T')[0];
        }
        })
        state.total_users = data.length;
        state.users = [...data]
    },
    EDIT_USER(state, payload) {
        const findIndex = state.users.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.users.splice(findIndex, 1, { ...payload })
    },
    DELETE_USER(state, payload) {
        const findIndex = state.users.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.users.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_USER(state, payload) {
        state.users.push(payload);
        // const findIndex = state.users.findIndex(({ id }) => id === payload.id)
        // findIndex !== -1 && state.users.splice(findIndex, 1, { ...payload })
    },
}

const actions = {
    async getAllUsers({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/users?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if(response && response.users && response.users.data) {
                commit('SET_ALL_USERS', response.users.data)
            }

            return response.users.data;
        })
    },
    async searchUsers({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/users?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.users && response.users.data) {
                commit('SET_ALL_USERS', response.users.data)
            }
            return response
        })
    },
    async editUser({ commit }, data) {
        delete data.users;
        delete data.total_users;
        return await api.put(`/users/${data.id}`, {...data}).then((response) => {
            commit('EDIT_USER', data)
            return response
        })
    },
    async addUser({ commit }, data) {
        return await api.post(`/users`, {...data}).then((response) => {
            commit('ADD_USER', response.user)
            return response.user;
        })
    },
    async deleteTeam({ commit }, data) {
        return await api.deleteAPI(`/users/${data}`).then((response) => {
            commit('DELETE_USER', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/users`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
}

const getters = {
    fields: ({ fields }) => fields,
    users: ({ users }) => users,
    total: ({total}) => total,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
