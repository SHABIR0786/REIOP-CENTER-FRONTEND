import * as api from "../Services/api"

const state = {
    subjectHeaders: [
        {
            key: "subject_address",
            label: "Subject Address",
            sortable: true
        },
        {
            key: "subject_city",
            label: "Subject City",
            sortable: true
        },
        {
            key: "subject_state",
            label: "Subject State",
            sortable: true
        },
        {
            key: "subject_zip",
            label: "Subject Zip",
            sortable: true
        },
        {
            key: "subject_county",
            label: "Subject County",
            sortable: true
        },
        {
            key: "market",
            label: "Market",
            sortable: true
        },
        {
            key: "submarket",
            label: "Submarket",
            sortable: true
        },
        {
            key: "subject_age",
            label: "Subject Age",
            sortable: true
        },
        {
            key: "subject_type",
            label: "Subject Type",
            sortable: true
        },
        {
            key: "total_seller",
            label: "Total Seller",
            sortable: true
        },
        {
            key: "list_stack",
            label: "List Stack",
            sortable: true
        },
        {
            key: "actions",
            label: "Actions"
        }
    ],
    subjects: []
}

const mutations = {
    SET_ALL_SUBJECTS(state, payload) {
        state.subjects = [...payload]
    },
    EDIT_SUBJECT(state, payload) {
        const findIndex = state.subjects.findIndex(({ id }) => id === payload.id)
        findIndex && state.subjects.splice(findIndex, 1, { ...payload })
    },
    DELETE_SUBJECT(state, payload) {
        const findIndex = state.subjects.findIndex(({ id }) => id === payload)
        findIndex && state.subjects.splice(findIndex, 1)
    }
}

const actions = {
    async getAllSubjects({ commit }) {
        return await api.get('/subject')
        .then((response) => {
            commit('SET_ALL_SUBJECTS', response)
            return response
        })
    },
    async editSubject({ commit }, data) {
        return await api.put('/subject/', {...data})
        .then((response) => {
            console.log(response, 'response')
            commit('EDIT_SUBJECT', data)
            return response
        })
    },
    async deleteSubject({ commit }, data) {
        return await api.deleteAPI(`/subject/${data}`)
        .then((response) => {
            console.log(response, 'response')
            commit('DELETE_SUBJECT', data)
            return response
        })
    }
}

const getters = {
    subjectHeaders: ({ subjectHeaders }) => subjectHeaders,
    subjects: ({ subjects }) => subjects
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}