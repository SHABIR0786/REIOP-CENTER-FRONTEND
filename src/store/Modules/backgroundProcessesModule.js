import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Process ID", sortable: true},

        // {key:"total_rows", label: "Total Rows"},

        {key:"is_processing", label: "Is Processing", sortable: true},
        {key:"is_processed", label: "Is Processed", sortable: true},
        {key:"file_name", label: "File Name", sortable: true},

        // Custom fields
        {key:"created_at", label: "Created At", sortable: true},
    ],
    processes: [],
    total: 0,
}

const mutations = {
    SET_ALL_PROCESSES(state, payload) {
        const process = {
            id: '',
            total_rows: '',
            is_processing: '',
            is_processed: '',
            file_name: '',
            created_at: ''
        }
        const readyData = [];
        payload.forEach(e => {
            process.id = e.id;
            process.total_rows = e.total_jobs;
            process.is_processing = e.pending_jobs;
            process.is_processed = e.total_jobs - e.pending_jobs;
            process.file_name = e.name;
            process.created_at = new Date(e.created_at * 1000).toLocaleString();
            readyData.push(process);
        })
        state.processes = [...readyData]
    },
    EDIT_LIST(state, payload) {
        const findIndex = state.lists.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.lists.splice(findIndex, 1, { ...payload })
    },
    DELETE_LIST(state, payload) {
        const findIndex = state.lists.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.lists.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_LIST(state, payload) {
        const findIndex = state.lists.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.lists.splice(findIndex, 1, { ...payload })
    },
}

const actions = {
    async getAllProcesses({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/batches?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.batch) {
                commit('SET_ALL_PROCESSES', response.batch)
            }

            return response
        })
    },
    async searchLists({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/lists?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.lists && response.lists.data) {
                commit('SET_ALL_LISTS', response.lists.data)
            }

            return response
        })
    },
    async editList({ commit }, data) {
        return await api.put(`/lists/${data.id}`, {...data}).then((response) => {
            commit('EDIT_LIST', data)
            return response
        })
    },
    async addList({ commit }, data) {
        return await api.post(`/lists`, {...data}).then((response) => {
            commit('ADD_LIST', data)
            return response
        })
    },
    async deleteList({ commit }, data) {
        return await api.deleteAPI(`/lists/${data}`).then((response) => {
            commit('DELETE_LIST', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/lists`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    processes: ({ processes }) => processes,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
