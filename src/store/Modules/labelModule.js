import * as api from "../Services/api";

const state = {
    fields: [
        {key: "field", label: "Field", sortable: true},
        {key: "label", label: "Custom Fields", sortable: true},
        {key: "description", label: "Description", sortable: true},
        {key: "visible", label: "Visible", sortable: true},
        {key: "actions", label: "Actions"}
    ],
    labels: [],
}

const mutations = {
    SET_LABELS(state, payload) {
        state.labels = payload;
    },
    EDIT_LABEL(state, payload) {
        const findIndex = state.labels.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.labels.splice(findIndex, 1, { ...payload })
    },
    ADD_LABEL(state, payload) {
        state.labels.push(payload);
    },
    DELETE_LABEL(state, payload) {
        const findIndex = state.labels.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.labels.splice(findIndex, 1)
    },
}

const actions = {
    async loadLabels({ commit }) {
        return await api.get('/labels').then((response) => {
            if (response && response.labels) {
                commit('SET_LABELS', response.labels);
            }
        });
    },
    async editLabel({ commit }, data) {
        return await api.put(`/labels/${data.id}`, data).then((response) => {
            commit('EDIT_LABEL', data)
            return response
        })
    },
    async addLabel({ commit }, data) {
        return await api.post(`/labels`, data).then((response) => {
            commit('ADD_LABEL', response.label)
            return response
        })
    },
    async deleteLabel({ commit }, data) {
        return await api.deleteAPI(`/labels/${data}`).then((response) => {
            commit('DELETE_LABEL', data)
            return response
        })
    },
}

const getters = {
    fields: ({ fields }) => fields,
    labels: ({ labels }) => labels,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
