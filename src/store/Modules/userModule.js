import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Id", sortable: true},
        // {key: "team_id", label: "Team Id"},
        {key: "name", label: "Name", sortable: true},
        {key: "email", label: "email", sortable: true},
        {key: "role", label: "Role", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        // {key: "company_role", label: "Company"},
        {key:"actions", label: "Actions"},
    ],
    users: [],
    teamAdminMembers: [],

    total: 0,
    total_team_members: 0,

    user:{},
    user_exist:{},

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
    SET_ALL_TEAM_ADMIN_MEMEBERS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            if(e.created_at) {
            e.created_at = e.created_at.split('T')[0];
            }
            if(e.updated_at) {
            e.updated_at = e.updated_at.split('T')[0];
        }
        })
        state.total_team_members = data.length;
        state.teamAdminMembers = [...data]
    },
    EDIT_USER(state, payload) {
        const findIndex = state.users.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.users.splice(findIndex, 1, { ...payload })
    },
    DELETE_USER(state, payload) {
        if(payload.created_at) {
            payload.created_at = payload.created_at.split('T')[0];
        }
        if(payload.updated_at) {
            payload.updated_at = payload.updated_at.split('T')[0];
        }
        const findIndex = state.users.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.users.splice(findIndex, 1,{...payload})
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_USER(state, payload) {
        state.users.push(payload);
        // const findIndex = state.users.findIndex(({ id }) => id === payload.id)
        // findIndex !== -1 && state.users.splice(findIndex, 1, { ...payload })
    },
    SET_USER(state, payload) {
        state.user =payload.user;
    },
    USER_EXIST(state, payload) {
        state.user_exist =payload.user;
    },
}

const actions = {
    async getAllUsers({ commit, dispatch }, {page, perPage,isActive}) {
        return await api.get(`/users?page=${page}&perPage=${perPage}&status=${isActive}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if(response && response.users && response.users.data) {
                commit('SET_ALL_USERS', response.users.data)
            }

            return response.users.data;
        })
    },
    async getTeamAdminMembers({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/teamAdminMemebers?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if(response && response.users && response.users.data) {
                commit('SET_ALL_TEAM_ADMIN_MEMEBERS', response.users.data)
            }

            return response.users.data;
        })
    },
    async searchUsers({ commit, dispatch }, {page, perPage, search,isActive}) {
        return await api.get(`/users?page=${page}&perPage=${perPage}&search=${search}&status=${isActive}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.users && response.users.data) {
                commit('SET_ALL_USERS', response.users.data)
                commit ('GET_TOTAL', response.count);
                
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
    // async deleteTeam({ commit }, data) {
    //     return await api.deleteAPI(`/users/${data}`).then((response) => {
    //         commit('DELETE_USER', data)
    //         return response
    //     })
    // },
    async getTotal({ commit }) {
        return await api.get(`/totals/users`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    async deleteUser({ commit }, data) {

        return await api.deleteAPI(`/users/${data.id}/${data.status}`).then((response) => {
            commit('DELETE_USER', response.user)
            return response
        })
    },
    async getUser({commit}, data) {        
        return await api.get(`/users/${data}`).then((response) => {
            if (response.user) {    
                            
                commit('SET_USER', response)
            }
            return response
        })
    },
    async userExist({commit}, email) {        
        return await api.get(`/userExist/${email}`).then((response) => {
            if (response.success) {    
                            
                commit('USER_EXIST', response)
            }
            return response
        })
    },
}

const getters = {
    fields: ({ fields }) => fields,
    users: ({ users }) => users,
    user: ({ user }) => user,
    total: ({total}) => total,
    // users: ({ users }) => users,
    user_exist: ({ user_exist }) => user_exist,


}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
