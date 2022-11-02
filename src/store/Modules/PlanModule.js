import * as api from "../Services/api"

const state = {
    plans: [],
    total: 0,
    plan:{},
    plansList: [],

}
const mutations = {
    SET_ALL_PLANS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            if(e.created_at) {
            e.created_at = e.created_at.split('T')[0];
            }
            if(e.updated_at) {
            e.updated_at = e.updated_at.split('T')[0];
        }
        })
        state.plans = [...data]
    },
    SET_PLANS_LIST(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            if(e.created_at) {
                e.created_at = e.created_at.split('T')[0];
            }
            if(e.updated_at) {
                e.updated_at = e.updated_at.split('T')[0];
            }
        })
        state.plansList = [...data]
    },
    EDIT_PLAN(state, payload) {
        const findIndex = state.plans.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.plans.splice(findIndex, 1, { ...payload })
    },
    DELETE_PLAN(state, payload) {
        const findIndex = state.plans.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.plans.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_PLAN(state, payload) {
        state.plans.push(payload);
    },
    SET_PLAN(state, payload) {
        state.plan =payload.plan;
    },
}

const actions = {
    async getAllPlans({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/plans?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if(response && response.plans && response.plans.data) {
                commit('SET_ALL_PLANS', response.plans.data)
            }

            return response.plans.data;
        })
    },
    async searchPlans({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/plans?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.plans && response.plans.data) {
                commit('SET_ALL_PLANS', response.plans.data)
            }
            return response
        })
    },
    async editPlan({ commit }, data) {
        return await api.put(`/plans/${data.id}`, {...data}).then((response) => {
            commit('EDIT_PLAN', data)
            return response
        })
    },
    async addPlan({ commit }, data) {
        return await api.post(`/plans`, {...data}).then((response) => {
            if(response.success){commit('ADD_PLAN', response.plan)}
            return response;
        })
    },
    async deletePlan({ commit }, data) {
        return await api.deleteAPI(`/plans/${data}`).then((response) => {
            commit('DELETE_PLAN', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/plans`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    async getPlan({commit}, data) {        
        return await api.get(`/plans/${data}`).then((response) => {
            if (response ) {                
                commit('SET_PLAN', response)
            }
            return response
        })
    },
    async getPlansList({commit}) {        
        return await api.get(`/plansList`).then((response) => {
            if (response ) {                                
                commit('SET_PLANS_LIST', response.plans)
            }
            return response
        })
    },
}

const getters = {
    plans: ({ plans }) => plans,
    plan: ({ plan }) => plan,
    total: ({total}) => total,
    plansList: ({plansList}) => plansList,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
