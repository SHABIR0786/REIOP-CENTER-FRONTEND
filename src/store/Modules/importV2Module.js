import * as api from "../Services/api";

const state = {
    fields: [
        {key:"file_name", label: "File Name", sortable: true},
        {key:"import_type", label: "Import Type", sortable: true},
        {key:"actions", stickyColumn: true, label: "Actions"},
        {key:"status", label: "Status", },
        {key:"percentage", label: "Completion %", sortable:true},
        {key:"created_records", label: "Created Records",},
        {key:"error_number", label: "Error Lines", sortable: true},
        {key:"total_row_number", label: "Total Lines", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"id", label: "Process ID", sortable: true},
    ],
    fieldsLoadingZone: [
        {key:"file_name", label: "File Name", sortable: true},
        {key:"import_type", label: "Import Type", sortable: true},
        {key:"actions", stickyColumn: true, label: "Actions"},
        {key:"status", label: "Status" },
        {key:"percentage", label: "Completion %", sortable:true},
        {key:"total_row_number", label: "Total Lines", sortable: true},
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"id", label: "Process ID", sortable: true},
    ],
    imports: [],
    pendingJobs: [],
    total: 0,
    editData: {},
    isSkipValidation: false,
    uploadProgress: {},
    showImportFirstPage: false,
    pageTo:0,
    pageFrom:0,
    pending_pageTo:0,
    pending_pageFrom:0,
    pending_total: 0,
}

const mutations = {
    SET_ALL_PROCESSES(state, payload) {
        const readyData = [];
        payload.data.forEach(e => {
            const process = {}
            const date = e.created_at;
            process.id = e.id;
            process.process_id = e.process_id
            process.error_number = e.error_number;
            process.total_row_number = e.total_row_number;
            process.total_jobs = e.total_jobs;
            process.pending_jobs = e.pending_jobs;
            process.failed_jobs = e.failed_jobs;
            process.is_processing = e.pending_jobs;
            process.is_processed = e.total_jobs - e.pending_jobs;
            process.file_name = e.file_name;
            process.user_id = e.user_id;
            process.status = e.status;
            process.user_name = e.user_name;
            process.import_type = e.import_type;
            process.extension = e.extension;
            process.created_at = new Date(date * 1000).toLocaleString();
            readyData.push(process);
        })
        state.pageTo = payload.to;
        state.pageFrom = payload.from;
        state.total = payload.total;
        state.imports = [...readyData]
    },
    SET_ALL_PENDING_JOBS(state, payload) {
        const readyData = [];
        payload.data.forEach(e => {
            const process = {}
            const date = e.created_at;
            process.id = e.id;
            process.process_id = e.process_id
            process.error_number = e.error_number;
            process.total_row_number = e.total_row_number;
            process.total_jobs = e.total_jobs;
            process.pending_jobs = e.pending_jobs;
            process.failed_jobs = e.failed_jobs;
            process.is_processing = e.pending_jobs;
            process.is_processed = e.total_jobs - e.pending_jobs;
            process.file_name = e.file_name;
            process.user_id = e.user_id;
            process.status = e.status;
            process.user_name = e.user_name;
            process.import_type = e.import_type;
            process.extension = e.extension;
            process.created_at = new Date(date * 1000).toLocaleString();
            readyData.push(process);
        })
        state.pending_pageTo = payload.to;
        state.pending_pageFrom = payload.from;
        state.pending_total = payload.total;
        state.pendingJobs = [...readyData]
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    SET_SHOW(state, payload) {
        state.uploadProgress = payload;
    },
    EDIT_IMPORT(state, payload) {
        payload.is_processing =  payload.pending_jobs;
        payload.is_processed = payload.total_jobs - payload.pending_jobs;
        const findIndex = state.imports.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.imports.splice(findIndex, 1, { ...payload })
    },

    SHOW_EDIT_MODAL(state, payload) {
        if (payload.import_type.includes('Skip Trace')){
            payload.subjects_count = 0
            payload.sellers_count = 0
            payload.error_subjects = 0
            payload.error_sellers = 0
        }
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
    },
    SHOW_IMPORT_FIRST_PAGE(state, bool) {
        state.showImportFirstPage = bool
    }
}

const actions = {
    async getAllProcesses({ commit, dispatch }, {page, perPage,search='',sortBy='', sortDesc='',team}) {
        return await api.get(`/batches?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}&team=${team}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if (response && response.batch) {
                commit('SET_ALL_PROCESSES', response.batch)
            }
            return response
        })
    },
    async checkallImports({ commit, dispatch}) {
        return await api.get(`/checkimportActivity`).then((response) => {
            console.log(response);
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if (response && response.batch) {
                commit('test', response)
            }
            return response
        })
    },
    async pendingJobBatches({ commit, dispatch }, {page, perPage,search='',sortBy='', sortDesc='',team}) {
        return await api.get(`/pendingJobBatches?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}&team=${team}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if (response && response.batch) {
                commit('SET_ALL_PENDING_JOBS', response.batch)
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
        delete data.sellers_count;
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
    async showBatch ({commit}, id) {
        return await api.get(`/batches/${id}`).then((response) => {
            commit('SET_SHOW', response)
            return response;
        });
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/imports`).then((response) => {
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
    async searchPendingJobs({ commit, dispatch }, {page, perPage,search}) {
        return await api.get(`/pendingJobBatches?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            if (response && response.batch) {
                commit('SET_ALL_PENDING_JOBS', response.batch)
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
    },
    showImportFirstPage({ commit }, bool) {
        commit("SHOW_IMPORT_FIRST_PAGE", bool)
    }
}

const getters = {
    total: ({total}) => total,
    pageTo: ({pageTo}) => pageTo,
    pageFrom: ({pageFrom}) => pageFrom,
    fields: ({ fields }) => fields,
    imports: ({ imports }) => imports,
    editData: ({ editData }) => editData,
    isSkipValidation: (state) => state.isSkipValidation,
    uploadProgress: ({uploadProgress}) => uploadProgress,
    showImportFirstPage: ({ showImportFirstPage }) => showImportFirstPage,
    fieldsLoadingZone: ({ fieldsLoadingZone }) => fieldsLoadingZone,
    pendingJobs: ({ pendingJobs }) => pendingJobs,
    pending_total: ({pending_total}) => pending_total,
    pending_pageTo: ({pending_pageTo}) => pending_pageTo,
    pending_pageFrom: ({pending_pageFrom}) => pending_pageFrom,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
