import * as api from "../Services/api";

const state = {
    fields: [
        {key:"file_name", label: "File Name", sortable: true},
        {key:"actions", stickyColumn: true, label: "Actions"},

        {key:"is_processing", label: "Is Processing"},
        {key:"is_processed", label: "Is Processed"},
        {key:"created_records", label: "Created Records", sortable: true},

        {key:"error_lines", label: "Error Lines", sortable: true},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"process_id", label: "Process ID", sortable: true},
    ],
    imports: [],
    total: 0,
}

const mutations = {
    SET_ALL_PROCESSES(state, payload) {
        const process = {
            file_name: '',
            id: '',
            total_rows: '',
            is_processing: '',
            process_id: '',
            created_at: ''
        }
        const readyData = [];
        payload.forEach(e => {
            process.process_id = e.id;
            process.total_rows = e.total_jobs;
            process.is_processing = e.pending_jobs;
            process.is_processed = e.total_jobs - e.pending_jobs;
            process.file_name = e.file_name;
            process.created_at = new Date(e.created_at * 1000).toLocaleString();
            readyData.push(process);
        })
        state.imports = [...readyData]
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    }
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
    imports: ({ imports }) => imports,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
