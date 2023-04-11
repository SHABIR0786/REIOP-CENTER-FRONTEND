import * as api from "../Services/api";

const state = {
    fields: [
        {key: "field", label: "Field", sortable: true},
        {key: "label", label: "Custom Fields", sortable: true},
        {key: "type", label: "Type", sortable: true},
        {key: "description", label: "Description", sortable: true},
        {key: "visible", label: "Visible", sortable: true},
        {key: "actions", label: "Actions"}
    ],
    labels: [],
    customSectionLabels: [],
    //custom fields
    visibleCustomFields: {
        list_custom_field_1: false,
        list_custom_field_2: false,
        list_custom_field_3: false,
        list_custom_field_4: false,
        list_custom_field_5: false,
    },
    customFieldsArray:[],

}

const mutations = {
    SET_LABELS(state, payload) {
        state.labels = payload;
    },
    SET_SECTION_LABELS(state, payload) {
        state.customSectionLabels = payload;
    },
    SET_ENABLE_LABELS(state, payload) {
        payload.forEach(e => {
            state.visibleCustomFields[e.field] = e.visible==1?true:false;
          });
          state.customFieldsArray = payload;
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
    async visibleCustomFields({ commit }) {
        return await api.get('/visibleCustomFields').then((response) => {
            if (response && response.labels) {
                commit('SET_ENABLE_LABELS', response.labels);
            }
        });
    },
    async sectionVisibleCustomFields({ commit },data) {
        return await api.post('/visible-custom-labels',{...data}).then((response) => {
            if (response && response.labels) {
                commit('SET_SECTION_LABELS', response.labels);
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
    visibleCustomFields: ({ visibleCustomFields }) => visibleCustomFields,
    customFieldsArray: ({ customFieldsArray }) => customFieldsArray,
    customSectionLabels: ({ customSectionLabels }) => customSectionLabels,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
