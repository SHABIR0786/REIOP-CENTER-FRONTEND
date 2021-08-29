import * as api from "../Services/api"

const state = {
    fields: [
        {key: "address", label: "Subject Address", sortable: true},
        {key: "city", label: "Subject City", sortable: true},
        {key: "state", label: "Subject State", sortable: true},
        {key: "zip", label: "Subject Zip", sortable: true},
        {key: "county", label: "Subject County", sortable: true},
        {key: "market", label: "Market", sortable: true},
        {key: "submarket", label: "Submarket", sortable: true},
        {key: "age", label: "Subject Age", sortable: true},
        {key: "type", label: "Subject Type", sortable: true},
        {key: "total_seller", label: "Total Seller", sortable: true},
        {key: "list_stack", label: "List Stack", sortable: true},
        {key: "actions", label: "Actions"}
    ],
    subjects: []
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
    }
}

const actions = {
    async getAllSubjects({ commit, dispatch }, data = 1) {
        return await api.get(`/subjects?page=${data}`).then((response) => {
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
    }
}

const getters = {
    fields: ({ fields }) => fields,
    subjects: ({ subjects }) => subjects
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
