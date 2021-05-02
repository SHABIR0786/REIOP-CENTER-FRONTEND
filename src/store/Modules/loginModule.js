import * as api from "../Services/api"

export const state = {
    isLogin: false
}

export const mutations = {
    SET_LOGIN(state, payload) {
        state.isLogin = payload
        console.log(state.isLogin, 'login module')
    }
}

export const actions = {
    async login({ commit }, data) {
        console.log(data)
        return await api.post('/auth/token/obtain/', {...data})
        .then((response) => {
            
            if(response.access && response.refresh){
                localStorage.setItem('accessToken', response.access)
                localStorage.setItem('refreshToken', response.refresh)
                api.setHeader(response)
                commit('SET_LOGIN', true)
            }
            else {
                localStorage.setItem('accessToken', null)
                localStorage.setItem('refreshToken', null)
                commit('SET_LOGIN', false)
            }
            return response
        })
    },
    logout({ commit }) {
        commit('SET_LOGIN', false)
    }
}

export const getters = {
    isLogin: ({ isLogin }) => isLogin,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}