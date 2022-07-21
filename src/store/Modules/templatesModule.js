import * as api from "../Services/api";

const state = {
    templates: [],
    template: {},
}

const mutations = {
    ADD_TEMPLATE(state, payload) {
        const findIndex = state.templates.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.templates.splice(findIndex, 1, { ...payload })
    },
    EDIT_TEMPLATE(state, payload) {
        const findIndex = state.templates.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.templates.splice(findIndex, 1, { ...payload })
    },
    TEMPLATES_LIST(state, payload) {
        // const data = [...payload]
        state.templates = payload
    },
    GET_TEMPLATE(state, payload) {
        if(payload !== null) {
            let parseData = JSON.parse(payload.configuration);
            state.template = parseData;
        }
    },
    VUEX_STORE(state) {
        state.templates = [];
        state.template = {};

    },
};

const actions = {
    async getAllTemplates({ commit, dispatch }) {
        return await api.get(`/templates`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.templates) {
                commit('TEMPLATES_LIST', response.templates)
            }

            return response
        })
    },
    async createTemplate({ commit }, template) {
        const data = {
            name: template.name || 'Template',
            configuration: JSON.stringify(template)
        }
        return await api.post(`/templates`, {...data}).then((response) => {
            commit('ADD_TEMPLATE', data)
            return response
        })
    },
    async editTemplate({ commit }, template) {
        let id = template.templateId;
        delete template.templateId;
        const data = {
            name: template.name || 'Template',
            configuration: JSON.stringify(template)
        }
        return await api.put(`/templates/${id}`, {...data}).then((response) => {
            commit('EDIT_TEMPLATE', data)
            return response
        })
    },
    async getTemplate({ commit }, data) {
        if(data.id !== null) {
            return await api.get(`/templates/${data.id}`).then((response) => {
                commit('GET_TEMPLATE', response.template)
                return response
            })
        } else {
            commit('GET_TEMPLATE', null);
        }
    },
 };

const getters = {
    templates: ({ templates }) => templates,
    template: ({ template}) => template
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
