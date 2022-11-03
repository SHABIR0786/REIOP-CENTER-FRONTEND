import * as api from "../Services/api"

const state = {
    team_fields: [
        {key:"id", label: "Id", sortable: true},
        // {key: "actions", label: "Actions"},
        {key: "team_name", label: "Team Name", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
    ],
    user_fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "name", label: "Name", sortable: true},
        {key: "email", label: "Email", sortable: true},
        {key: "number_of_teams", label: "# of Teams", sortable: true},
        {key: "company_role", label: "Company Role", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"actions", label: "Actions"},
    ],
    teams: [],
    users: [],

    companyTeams: [],
    total_team: 0,
    total_users: 0,

    existTeam: [],
    team:{},
    company:{},


}

const mutations = {
    SET_ALL_TEAMS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.teams = [...data]
    },
    SET_ALL_TEAMS_USERS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.users = [...data]
    },
    SET_COMPANY_TEAMS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.total_users = e.users.length;
        })
        state.companyTeams = [...data]
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
        state.total_team = payload;
    },
    GET_TOTAL_USERS(state, payload) {
        state.total_users = payload;
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
    },
    FILLED_DATA(state, data){
        state.existTeam = data;
    },
    SET_TEAM(state, payload) {
        state.team =payload.team;
    },
    SET_COMPANY(state, payload) {
        if(payload?.company?.teams){
            payload?.company?.teams.forEach(e => {
                if(e.created_at) {
                    e.created_at = e.created_at.split('T')[0];
                }
                if(e.updated_at) {
                    e.updated_at = e.updated_at.split('T')[0];
                }
            })
        }
        if(payload?.company?.users){
            payload?.company?.users.forEach(e => {
                if(e.created_at) {
                    e.created_at = e.created_at.split('T')[0];
                }
                if(e.updated_at) {
                    e.updated_at = e.updated_at.split('T')[0];
                }
            })
        }
        if(payload?.company?.plan == null){
            payload.company.plan = {};
        }
        state.company =payload.company;
    },
}

const actions = {
    async getCompany({commit}, data) {        
        return await api.get(`/companyAdminTeams?user_id=${data.user_id}&company_id=${data.company_id}`).then((response) => {
            if (response.success) {                
                commit('SET_COMPANY', response)
            }
            return response
        })
    },
    async getAllTeams({ commit, dispatch }, {page, perPage,user_id}) {
        return await api.get(`/companyAdminTeams?page=${page}&perPage=${perPage}&user_id=${user_id}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }            
            if(response && response.teams && response.teams.data) {
                commit('SET_ALL_TEAMS', response.teams.data)
                commit ('GET_TOTAL', response.count);
            }

            return response
        })
    },
    async getAllCompanyTeamMembers({ commit, dispatch }, {page, perPage,user_id}) {
        return await api.get(`/companyTeamMembers?page=${page}&perPage=${perPage}&user_id=${user_id}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }            
            if(response && response.users && response.users.data) {
                commit('SET_ALL_TEAMS_USERS', response.users.data)
                commit ('GET_TOTAL_USERS', response.count);
            }

            return response
        })
    },
    async getCompanyTeams({commit,dispatch }, {companyid}) {
        return await api.get(`/companyTeams?companyid=${companyid}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.teams && response.teams.data) {
                commit('SET_COMPANY_TEAMS', response.teams)
            }

            return response
        })
    },
    async searchTeams({ commit, dispatch }, {page, perPage, search,user_id}) {
        return await api.get(`/companyAdminTeams?page=${page}&perPage=${perPage}&search=${search}&user_id=${user_id}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.teams && response.teams.data) {
                commit('SET_ALL_TEAMS', response.teams.data)
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    async searchUsers({ commit, dispatch }, {page, perPage, search,user_id}) {
        return await api.get(`/companyTeamMembers?page=${page}&perPage=${perPage}&search=${search}&user_id=${user_id}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.users && response.users.data) {
                commit('SET_ALL_TEAMS_USERS', response.users.data)
                commit ('GET_TOTAL_USERS', response.count);
            }
            return response
        })
    },
    async editTeam({ commit }, data) {
        delete data.users;
        delete data.total_users;
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
            if(response.status ==true){
                commit('DELETE_TEAM', data)
            }
            return response
        })
    },
    async addTeamMember({commit}, data) {
        return await api.post(`/teams/add-member`, {...data}).then((response) => {
            if(response.success==true) {
                commit('ADD_TEAM_MEMBER', data)
            }
            return response
        })
    },
    async deleteTeamMember({commit}, data) {
        return await api.deleteAPI(`/teams/delete-member/${data.team_id}/${data.user_id}`).then((response) => {
            commit('DELETE_TEAM_MEMBER', data)
            return response
        })
    },
    // async getTotal({ commit }) {
    //     return await api.get(`/totals/teams`).then((response) => {
    //         if (response && response.count > -1) {
    //             commit ('GET_TOTAL', response.count);
    //         }
    //         return response
    //     })
    // },
    async filledData({commit} , data){
        commit ('FILLED_DATA', data);
    },
    async getTeam({commit}, data) {        
        return await api.get(`/teams/${data}`).then((response) => {
            if (response ) {                
                commit('SET_TEAM', response)
            }
            return response
        })
    },
    async updateTeamName({commit}, data) {        
        return await api.post(`/updateTeamName`, {...data}).then((response) => {
            if (response ) {                
                commit('SET_TEAM', response)
            }
            return response
        })
    },
}

const getters = {
    team_fields: ({ team_fields }) => team_fields,
    user_fields: ({ user_fields }) => user_fields,
    teams: ({ teams }) => teams,
    users: ({ users }) => users,

    companyTeams: ({ companyTeams }) => companyTeams,
    total_team: ({total_team}) => total_team,
    total_users: ({total_users}) => total_users,

    existTeam: ({existTeam}) => existTeam,
    team: ({ team }) => team,
    company: ({ company }) => company,


}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
