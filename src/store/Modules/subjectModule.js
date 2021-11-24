import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "total_sellers", label: "Total Sellers"},
        {key: "list_stack", label: "List Stack"},

        {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true},
        {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
        {key: "subject_city", label: "Subject City", sortable: true},
        {key: "subject_state", label: "Subject State", sortable: true},
        {key: "subject_zip", label: "Subject Zip", sortable: true},
        {key: "subject_country", label: "Subject County", sortable: true},
        {key: "subject_market", label: "Market", sortable: true},
        {key: "subject_type", label: "Subject Type", sortable: true},
        {key: "subject_age", label: "Subject Age", sortable: true},


        // Custom Fields
        {key: "subject_last_marked_date", label: "Last Marketed Date", sortable: true},
        {key: "subject_last_exported_date", label: "Last Exported Date", sortable: true},
        {key: "subject_pull_date", label: "Pull Date", sortable: true},
        {key: "subject_skip_trace_date", label: "Skip Trace Date", sortable: true},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_id", label: "Uploaded By", sortable: true},

    ],
    subjects: [],
    total: 0,
    subject: {},
}

const mutations = {
    SET_ALL_SUBJECTS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.list_stack = e.lists.length;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.total_sellers = e.sellers.length;
        })
        state.subjects = [...data]
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
    },
    ADD_SUBJECT(state, payload) {
        const findIndex = state.subjects.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.subjects.splice(findIndex, 1, { ...payload })
    },
    SET_SUBJECT(state, payload) {
        state.subject = {...payload};
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
    async getSubject({commit}, data) {
        return await api.get(`/subjects/full/${data}`).then((response) => {
            if (response && response.subject) {
                commit('SET_SUBJECT', response.subject)
            }

            return response
        })
    },
    async searchSubjects({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/subjects?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
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
        const updatedData = Object.assign({}, data);
        delete updatedData.sellers;
        delete updatedData.total_sellers;

        return await api.put(`/subjects/${data.id}`, updatedData).then((response) => {
            commit('EDIT_SUBJECT', data)
            return response
        })
    },
    async addSubject({ commit }, data) {
        return await api.post(`/subjects`, {...data}).then((response) => {
            commit('ADD_SUBJECT', data)
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
    total: ({total}) => total,
    subject: ({subject}) => subject
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
