import * as api from "../Services/api";

const state = {
    fields: [
        {key:"file_name", label: "File Name", sortable: true},
        {key:"import_type", label: "Import Type", sortable: true},
        {key:"actions", stickyColumn: true, label: "Actions"},
        {key:"percentage", label: "Completion %", sortable:true},
        {key:"created_records", label: "Created Records", sortable: true},
        {key:"error_number", label: "Error Lines", sortable: true},
        {key:"total_row_number", label: "Total Lines", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"id", label: "Process ID", sortable: true},
    ],
    imports: [],
    total: 0,
    editData: {},
    isSkipValidation: false,
}

const mutations = {
    SET_ALL_PROCESSES(state, payload) {
        const readyData = [];
        payload.forEach(e => {
            const process = {}

            const date = e.created_at;
            process.id = e.id;
            process.process_id = e.process_id
            process.error_number = e.error_number;
            process.total_row_number = e.total_row_number;
            process.is_processing = e.pending_jobs;
            process.is_processed = e.total_jobs - e.pending_jobs;
            process.file_name = e.file_name;
            process.user_id = e.user_id;
            process.import_type = e.import_type;
            process.extension = e.extension;
            process.created_at = new Date(date * 1000).toLocaleString();
            readyData.push(process);
        })
        state.imports = [...readyData]
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    EDIT_IMPORT(state, payload) {
        payload.is_processing =  payload.pending_jobs;
        payload.is_processed = payload.total_jobs - payload.pending_jobs;
        const findIndex = state.imports.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.imports.splice(findIndex, 1, { ...payload })
    },

    SHOW_EDIT_MODAL(state, payload) {
        const date = payload.created_at;
        payload.created_at = new Date(date * 1000).toLocaleString();
        payload.is_processed = payload.total_jobs - payload.pending_jobs;
        state.editData = payload
    },


    EXPORTED() {
        // console.log('payload',  payload);
    },
    DELETE_PROCESS(state, payload) {
        const findIndex = state.imports.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.imports.splice(findIndex, 1)
    },
    SET_SKIP_VALIDATION(state, bool) {
        state.isSkipValidation = bool;
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
    async editImport({ commit }, data) {
        delete data.is_processing;
        delete data.is_processed;
        delete data.error_emails;
        delete data.error_subjects;
        delete data.error_phones;
        delete data.emails_count;
        delete data.phones_count;
        delete data.subjects_count;
        return await api.put(`/batches/${data.id}`, {...data}).then((response) => {
            commit('EDIT_IMPORT', data)
            return response
        })
    },

    async showEditModal({ commit }, data) {
        return await api.get(`/editModal/${data.id}`).then((response) => {
            commit('SHOW_EDIT_MODAL', response.editData)
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
    },
    async searchImpots({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/batches?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if (response && response.batch) {
                commit('SET_ALL_PROCESSES', response.batch)
            }
            return response
        })
    },

    async exportFile({ commit }, data) {
        return await api.post(`/export`, {...data}).then((response) => {
            var fileName = data['file']['file_name'];
            if(data.type === 'error'){
                fileName = 'Errors-'+data['file']['file_name'];
            }
            var fileURL = window.URL.createObjectURL(new Blob([response]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', fileName);
            document.body.appendChild(fileLink);
            fileLink.click();
            commit('EXPORTED', response);
        })
    },
    async deleteProcess({ commit }, data) {
        return await api.deleteAPI(`/batches/${data}`).then((response) => {
            commit('DELETE_PROCESS', data)
            return response
        })
    },
    setSkipValidation({ commit }, bool) {
        commit('SET_SKIP_VALIDATION', bool)
    }
}

const getters = {
    fields: ({ fields }) => fields,
    imports: ({ imports }) => imports,
    editData: ({ editData }) => editData,
    isSkipValidation: (state) => state.isSkipValidation
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
