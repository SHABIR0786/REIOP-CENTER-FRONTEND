import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "ID", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "team_name", label: "Team Name", sortable: true},
        {key: "company_name", label: "Company Name", sortable: true},

        // {key: "owner", label: "Owner", sortable: true},
        // {key: "total_users", label: "Members Number", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
    ],
    teams: [],
    allTeams: [],
    companyTeams: [],
    total: 0,
    existTeam: [],
    team:{},
    isTeamViewAccess : false,
    teamViewAccessData : {},
    companyTeamName : '',
    mappingTemplateCopyTeamData:[],
    propertiesTemplateCopyTeamData:[],




}

const mutations = {
    SET_TEAMS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.total_users = e.users.length;
        })
        state.teams = [...data]
    },
    SET_ALL_TEAMS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.text = e.name;
            e.value = e.id;
        })
        state.allTeams = [...data]
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
        state.total = payload;
    },
    ADD_TEAM(state, payload) {
        const findIndex = state.teams.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.teams.splice(findIndex, 1, { ...payload })
    },
    Mapping_Template_Copy_Team(state, payload) {
        state.mappingTemplateCopyTeamData = payload;
    },
    PROPERTIES_Template_Copy_Team(state, payload) {
        state.propertiesTemplateCopyTeamData = payload;
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
    SET_TEAM_VIEW_ACCESS(state, payload) {
        state.isTeamViewAccess = true;
        state.teamViewAccessData = payload.team;
        state.companyTeamName = payload.team?.company['name']+' - '+payload.team['name'];
    },
    SET_CLOSE_TEAM_VIEW_ACCESS(state) {
        console.log('SET_CLOSE_TEAM_VIEW_ACCESS');
        
        sessionStorage.removeItem("teamAccessId");
        state.isTeamViewAccess = false;
        state.teamViewAccessData = {};
        state.companyTeamName = '';
    },
}

const actions = {
    async getTeams({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/teams?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.teams && response.teams.data) {
                commit('SET_TEAMS', response.teams.data)
            }

            return response
        })
    },
    async getAllTeams({ commit, dispatch }) {
        return await api.get(`/allTeams`).then((response) => {
            if (response && response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.teams) {
                commit('SET_ALL_TEAMS', response.teams)
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
    async searchTeams({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/teams?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.teams && response.teams.data) {
                commit('SET_TEAMS', response.teams.data)
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
    async mappingTemplate({ commit }, data) {
        return await api.post(`/teamMappingTemplate`, {...data}).then((response) => {
            commit('Mapping_Template_Copy_Team', response.data)
            return response
        })
    },
    async propertiesTemplate({ commit }, data) {
        return await api.post(`/teamPropertiesTemplate`, {...data}).then((response) => {
            commit('PROPERTIES_Template_Copy_Team', response.data)
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
                commit('ADD_TEAM_MEMBER', response.user)
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
    async getTotal({ commit }) {
        return await api.get(`/totals/teams`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
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
    async teamViewAccess({commit}) {        
        return await api.get(`/teamViewAccess`).then((response) => {
            if (response.success) {                
                commit('SET_TEAM_VIEW_ACCESS', response)
            }
            return response
        })
    },
    async CloseTeamViewAccess({commit}) {        
            
        commit('SET_CLOSE_TEAM_VIEW_ACCESS')
    },
}

const getters = {
    fields: ({ fields }) => fields,
    teams: ({ teams }) => teams,
    allTeams: ({ allTeams }) => allTeams,
    companyTeams: ({ companyTeams }) => companyTeams,
    total: ({total}) => total,
    existTeam: ({existTeam}) => existTeam,
    team: ({ team }) => team,
    isTeamViewAccess: ({ isTeamViewAccess }) => isTeamViewAccess,
    teamViewAccessData: ({ teamViewAccessData }) => teamViewAccessData,
    companyTeamName: ({ companyTeamName }) => companyTeamName,
    mappingTemplateCopyTeamData: ({ mappingTemplateCopyTeamData }) => mappingTemplateCopyTeamData,
    propertiesTemplateCopyTeamData: ({ propertiesTemplateCopyTeamData }) => propertiesTemplateCopyTeamData,



    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
