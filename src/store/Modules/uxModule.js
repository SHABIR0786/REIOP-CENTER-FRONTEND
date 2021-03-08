const state = {
    isLoading: false,
    loaderText: ''
}

const mutations = {
    SET_LOADING(state, payload) {
        state.isLoading = true
        state.loaderText = payload
    },
    HIDE_LOADER(state) {
        state.isLoading = false
        state.loaderText = ''
    }
}

const actions = {
    setLoading ({ commit }, data) {
        commit('SET_LOADING', data)
    },
    hideLoader ({ commit }) {
        commit('HIDE_LOADER')
    }
}

const getters = {
    isLoading: ({ isLoading }) => isLoading,
    loaderText: ({ loaderText }) => loaderText,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}