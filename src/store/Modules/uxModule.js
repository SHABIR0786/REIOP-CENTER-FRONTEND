const state = {
    isLoading: false,
    loaderText: '',
    isCollapsed: false,
}

const mutations = {
    SET_LOADING(state, payload) {
        state.isLoading = true
        state.loaderText = payload
    },
    HIDE_LOADER(state) {
        state.isLoading = false
        state.loaderText = ''
    },
    TOGGLE_SIDEBAR(state) {
        state.isCollapsed = !state.isCollapsed
    }
}

const actions = {
    setLoading ({ commit }, data='Loading data...') {
        commit('SET_LOADING', data)
    },
    hideLoader ({ commit }) {
        commit('HIDE_LOADER')
    },
    toggleSidebar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    }
}

const getters = {
    isLoading: ({ isLoading }) => isLoading,
    loaderText: ({ loaderText }) => loaderText,
    isCollapsed: ({ isCollapsed }) => isCollapsed,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
