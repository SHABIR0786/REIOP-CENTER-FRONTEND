import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", stickyColumn: true, label: "Id", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},
        {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true},
        {key: "subject_city", stickyColumn: true, label: "Subject City", sortable: true},
        {key: "subject_state", label: "Subject State", sortable: true},
        {key: "subject_zip", label: "Subject Zip", sortable: true},
        {key: "subject_country", label: "Subject County", sortable: true},
        {key: "subject_market", label: "Market", sortable: true},
        {key: "subject_submarket", label: "Submarket", sortable: true},
        {key: "subject_age", label: "Subject Age", sortable: true},
        {key: "subject_type", label: "Subject Type", sortable: true},
    ],
    subjects: [],
    total: 0,
}

const mutations = {
    SET_ALL_SUBJECTS(state, payload) {
        state.subjects = [...payload]
    },
    EDIT_SUBJECT(state, payload) {
        const findIndex = state.subjects.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.subjects.splice(findIndex, 1, { ...payload })
    },
    DELETE_SUBJECT(state, payload) {
        const findIndex = state.subjects.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.subjects.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    }
}

const actions = {
    async getAllSubjects({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/subjects?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', response.subjects.data)
            }

            return response
        })
    },
    async editSubject({ commit }, data) {
        return await api.put(`/subjects/${data.id}`, {...data}).then((response) => {
            commit('EDIT_SUBJECT', data)
            return response
        })
    },
    async deleteSubject({ commit }, data) {
        return await api.deleteAPI(`/subjects/${data}`).then((response) => {
            commit('DELETE_SUBJECT', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/subjects`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    subjects: ({ subjects }) => subjects,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
