import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "Id", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "total_sellers", label: "Total Sellers", sortable: true},
        {key: "list_stack", label: "List Stack", sortable: true},

        {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true},
        {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
        {key: "subject_city", label: "Subject City", sortable: true},
        {key: "subject_state", label: "Subject State", sortable: true},
        {key: "subject_zip", label: "Subject Zip", sortable: true},
        {key: "subject_county", label: "Subject County", sortable: true},
        {key: "subject_market", label: "Market", sortable: true},
        {key: "subject_type", label: "Subject Type", sortable: true},
        {key: "subject_age", label: "Subject Age", sortable: true},


        // Custom Fields
        {key: "subject_last_marked_date", label: "Last Marketed Date", sortable: true},
        {key: "subject_last_exported_date", label: "Last Exported Date", sortable: true},
        {key: "subject_pull_date", label: "Pull Date", sortable: true},
        {key: "subject_skip_trace_date", label: "Skip Trace Date", sortable: true},

        // Errors
        {key: "subject_error", label: "Error", sortable: true},
        {key: "subject_error_type", label: "Error Type", sortable: true},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},

    ],
    subjects: [],
    total: 0,
    subject: {},
    filteredSubject: {},
    filteredSubjectsCount: 0,
}

const mutations = {
    SET_ALL_SUBJECTS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.list_stack = e.lists.length;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.total_sellers = e.sellers.length;
            e.lists.forEach(el =>{
                el.created_at = el.created_at.split('T')[0];
                el.updated_at = el.updated_at.split('T')[0];
                el.user_name  = e.user_name
            })
        })
        state.subjects = JSON.stringify(data);
    },
    EDIT_SUBJECT(state, payload) {
        const SUBJECTS = JSON.parse(state.subjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1, { ...payload })
        state.subjects = JSON.stringify(SUBJECTS);
    },
    DELETE_SUBJECT(state, payload) {
        const SUBJECTS = JSON.parse(state.subjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1)
        state.subjects = JSON.stringify(SUBJECTS);
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },

    FILTER_SUBJECT(state, payload) {
        const filteredData = [...payload.data]
        filteredData.forEach(e => {
            e.list_stack = e.lists.length;
            e.total_sellers = e.sellers.length;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.filteredSubject =JSON.stringify(filteredData);
        state.filteredSubjectsCount =payload.total;
    },
    SET_SUBJECT(state, payload) {
        state.subject = {...payload};
    },
    DELETE_MULTIPLE_SUBJECTS(state, payload) {
        const SUBJECTS = JSON.parse(state.subjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1)
        state.subjects = JSON.stringify(SUBJECTS);
    },
    VUEX_STORE(state) {
        state.subjects = [];
        state.total = 0;
        state.subject = {};
    },
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
        delete updatedData.user_name;
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


    async filterSubject({ commit }, data) {
        return await api.post(`/subjects/filter`, {...data}).then((response) => {
            commit('FILTER_SUBJECT', response.subjects)
            return response
        })
    },


    async deleteSubject({ commit }, data) {
        return await api.deleteAPI(`/subjects/${data}`).then((response) => {
            commit('DELETE_SUBJECT', data)
            return response
        })
    },
    async deleteMultipleSubjects({ commit }, data) {
        return await api.deleteAPI(`/subjects/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_SUBJECTS', data)
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
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

const getters = {
    fields: ({ fields }) => fields,
    subjects: ({ subjects }) => {
        if (typeof subjects === 'string') {
            return JSON.parse(subjects);
        }

        return [];
    },
    total: ({total}) => total,
    filteredSubjectsCount: ({filteredSubjectsCount}) => filteredSubjectsCount,
    subject: ({subject}) => subject,
    filteredSubject: ({ filteredSubject }) => {
        if (typeof filteredSubject === 'string') {
            return JSON.parse(filteredSubject);
        }
        return [];
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
