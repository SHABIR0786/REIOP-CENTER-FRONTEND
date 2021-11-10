import * as api from "../Services/api";

const state = {
    templates: []
}

const mutations = {
    ADD_TEMPLATE(state, payload) {
        console.log('test test 2', state, payload);
        const findIndex = state.templates.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.templates.splice(findIndex, 1, { ...payload })
    },
    TEMPLATES_LIST(state, payload) {
        // const data = [...payload]
        state.templates = payload
    }
};

const actions = {
    async getAllTemplates({ commit, dispatch }) {
        return await api.get(`/templates`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.templates) {
                commit('TEMPLATES_LIST', response.templates.data)
            }

            return response
        })
    },
    async createTemplate({ commit }, template) {
        const data = {
            name: template.name | 'Template',
            configuration: JSON.stringify(template)
        }
        return await api.post(`/templates`, {...data}).then((response) => {
            commit('ADD_TEMPLATE', data)
            return response
        })
    },
 };

const getters = {
    templates: ({ templates }) => templates,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
