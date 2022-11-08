import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "ID", sortable: true},
        {key: "seller_id",label: "Seller ID", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},

        {key: "email_address", label: "Email Address", sortable: true},
        {key: "email_validity", label: "Email Validity", sortable: true},
        {key: "email_skip_source", label: "Skip Source", sortable: true},

        // Errors
        {key: "email_error", label: "Error", sortable: true},
        {key: "email_error_type", label: "Error Type", sortable: true},

        // Custom Fields
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    emails: [],
    total: 0,
    email: {},
    filteredEmail: {},
    filtersCountTable: [],
    filteredEmailsCount: 0,
    filterList: [],
    relatedSkipSources: [],
}

const mutations = {
    SET_ALL_EMAILS(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            if(e.email_skip_source.length > 0) {
                e.email_skip_source = [...new Set(e.skip_sources.map(i=>i['email_skip_source']))].join();
            }
        })
        state.emails = JSON.stringify(data);
        state.total = payload.total;
    },
    SET_RELATED_SKIP_SOURCES(state, payload) {
        state.relatedSkipSources = payload;
    },
    EDIT_EMAIL(state, payload) {
        const EMAIL = JSON.parse(state.emails)
        const findIndex = EMAIL.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && EMAIL.splice(findIndex, 1, { ...payload })
        state.emails = JSON.stringify(EMAIL);
    },
    DELETE_EMAIL(state, payload) {
        const EMAIL = JSON.parse(state.emails)
        const findIndex = EMAIL.findIndex(({ id }) => id === payload)
        findIndex !== -1 && EMAIL.splice(findIndex, 1)
        state.emails = JSON.stringify(EMAIL);
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    FILTER_EMAIL(state, payload) {
        const filteredData = [...payload.data]
        filteredData.forEach(e => {
            // e.list_stack = e.lists.length;
            // e.total_sellers = e.sellers.length;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            if(e.email_skip_source.length > 0) {
                e.email_skip_source = [...new Set(e.skip_sources.map(i=>i['email_skip_source']))].join();
            }
        })
        state.filteredEmail =JSON.stringify(filteredData);
        state.filteredEmailsCount = payload.total;
        state.total = payload.total;
    },
    SET_FILTERS_COUNT_TABLE(state, payload) {
        state.filtersCountTable = payload;
    },
    EMAIL_FILTER_LIST(state, payload) {
        if(payload.data) {
            state.filterList = JSON.stringify(payload.data);            
        }
    },
    SET_EMAIL(state, payload) {
        state.email = {...payload};
    },
    ADD_EMAIL(state, payload) {
        const EMAIL = JSON.parse(state.emails)
        const findIndex = EMAIL.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && EMAIL.splice(findIndex, 1, { ...payload })
        state.emails = JSON.stringify(EMAIL);
    },
    DELETE_MULTIPLE_EMAILS(state, payload) {
        const EMAIL = JSON.parse(state.emails)
        const findIndex = EMAIL.findIndex(({ id }) => id === payload)
        findIndex !== -1 && EMAIL.splice(findIndex, 1)
        state.emails = JSON.stringify(EMAIL);
    },
    VUEX_STORE(state) {
        state.emails = [];
        state.total = 0;
        state.email = {};
        state.filterList = [];
    },
}

const actions = {
    async filtersOnTable({commit, dispatch}, type) {
        return await api.get(`/emails/filtersOnTable?type=${type}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.filtersCount) {
                commit('SET_FILTERS_COUNT_TABLE', response.filtersCount)
            }

            return response
        })
    },
    async relatedSkipSources({commit, dispatch}, id) {
        return await api.get(`/emails/skipsources/${id}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.emailSkipSources) {
                commit('SET_RELATED_SKIP_SOURCES', response?.emailSkipSources)
            }

            return response;
        });
    },
    async getAllEmails({ commit, dispatch }, {page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/emails?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.emails && response.emails.data) {
                commit('SET_ALL_EMAILS', response.emails)
            }

            return response
        })
    },
    async searchEmails({ commit, dispatch }, {page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/emails?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.emails && response.emails.data) {
                commit('SET_ALL_EMAILS', response.emails)
            }

            return response
        })
    },
    async getEmail({commit}, data) {
        return await api.get(`/emails/full/${data}`).then((response) => {
            if (response && response.email) {
                commit('SET_EMAIL', response.email)
            }
            return response
        })
    },
    async filterEmail({ commit }, param) {
        let data = Object.assign({}, JSON.parse(JSON.stringify(param)));
        if(data.filter){
            let keys = Object.keys(data.filter);
            for(let i = 0; i < keys.length; i++) {
                let index =  data.filter[keys[i]].findIndex(x=>x == "Blank");
              if(index != -1) {
                data.filter[keys[i]][index] = " ";
              }
            }
        }
        return await api.post(`/emails/filter`, {...data}).then((response) => {
            commit('FILTER_EMAIL', response.emails)
            return response
        })
    },
    async emailFilterList({ commit }, param) {
        let data = Object.assign({}, JSON.parse(JSON.stringify(param)));
        if(data.filter){
            let keys = Object.keys(data.filter);
            for(let i = 0; i < keys.length; i++) {
                let index =  data.filter[keys[i]].findIndex(x=>x == "Blank");
              if(index != -1) {
                data.filter[keys[i]][index] = " ";
              }
            }
        }
        return await api.post(`/emails/filterList`, {...data}).then((response) => {
            commit('EMAIL_FILTER_LIST', response.lists)
            return response
        })
    },
    async editEmail({ commit }, data) {
        delete data.user_name;
        return await api.put(`/emails/${data.id}`, {...data}).then((response) => {
            commit('EDIT_EMAIL', data)
            return response
        })
    },
    async addEmail({ commit }, data) {
        return await api.post(`/emails`, {...data}).then((response) => {
            commit('ADD_EMAIL', data)
            return response
        })
    },
    async deleteEmail({ commit }, data) {
        return await api.deleteAPI(`/emails/${data}`).then((response) => {
            commit('DELETE_EMAIL', data)
            return response
        })
    },
    async deleteMultipleEmails({ commit }, data) {
        return await api.deleteAPI(`/emails/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_EMAILS', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/emails`).then((response) => {
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
    emails: ({ emails }) => {
        if (typeof emails === 'string') {
            return JSON.parse(emails);
        }
        return [];
    },
    total: ({total}) => total,
    filteredEmailsCount: ({filteredEmailsCount}) => filteredEmailsCount,
    email: ({email}) => email,
    filterList: ({filterList}) => filterList,
    filtersCountTable: ({filtersCountTable}) => filtersCountTable,
    filteredEmail: ({ filteredEmail }) => {
        if (typeof filteredEmail === 'string') {
            return JSON.parse(filteredEmail);
        }
        return [];
    },
    relatedSkipSources: ({relatedSkipSources}) => relatedSkipSources
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
