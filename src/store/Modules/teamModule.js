import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "name", label: "Name", sortable: true},
        {key: "owner", label: "Owner"},
        {key: "total_users", label: "Members Number"},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
    ],
    teams: [],
    total: 0,
}

const mutations = {
    SET_ALL_TEAMS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.total_users = e.users.length;
        })
        state.teams = [...data]
    },
    EDIT_TEAM(state, payload) {
        const findIndex = state.teams.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.teams.splice(findIndex, 1, { ...payload })
    },
    DELETE_TEAM(state, payload) {
        const findIndex = state.teams.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.teams.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_TEAM(state, payload) {
        const findIndex = state.teams.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.teams.splice(findIndex, 1, { ...payload })
    },
    ADD_TEAM_MEMBER(state, payload) {
        const findIndex = state.teams.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.teams.splice(findIndex, 1, { ...payload })
    },
    DELETE_TEAM_MEMBER(state, payload) {
        const findIndex = state.teams.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.teams.splice(findIndex, 1, { ...payload })
    }
}

const actions = {
    async getAllTeams({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/teams?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.teams && response.teams.data) {
                commit('SET_ALL_TEAMS', response.teams.data)
            }

            return response
        })
    },
    async searchTeams({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/teams?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.teams && response.teams.data) {
                commit('SET_ALL_TEAMS', response.teams.data)
            }

            return response
        })
    },
    async editTeam({ commit }, data) {
        return await api.put(`/teams/${data.id}`, {...data}).then((response) => {
            commit('EDIT_TEAM', data)
            return response
        })
    },
    async addTeam({ commit }, data) {
        return await api.post(`/teams`, {...data}).then((response) => {
            commit('ADD_TEAM', data)
            return response
        })
    },
    async deleteTeam({ commit }, data) {
        return await api.deleteAPI(`/teams/${data}`).then((response) => {
            commit('DELETE_TEAM', data)
            return response
        })
    },
    async addTeamMember({commit}, data) {
        return await api.post(`/teams/add-member`, {...data}).then((response) => {
            commit('ADD_TEAM_MEMBER', data)
            return response
        })
    },
    async deleteTeamMember({commit}, data) {
        return await api.deleteAPI(`/teams/delete-member/${data}`).then((response) => {
            commit('DELETE_TEAM_MEMBER', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/teams`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    teams: ({ teams }) => teams,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
