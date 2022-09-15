import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "ID", sortable: true},
        {key: "seller_id", label: "Seller ID", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},

        {key: "phone_number", label: "Phone Number", sortable: true},
        {key: "phone_type", label: "Phone Type", sortable: true},
        {key: "phone_validity", label: "Phone Validity", sortable: true},
        {key: "phone_skip_source", label: "Phone Skip Source", sortable: true},

        // Errors
        {key: "phone_error", label: "Error", sortable: true},
        {key: "phone_error_type", label: "Error Type", sortable: true},

        // Custom Fields
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    phoneNumbers: [],
    total: 0,
    filtersCountTable: [],
    phoneNumber: {},
    filteredPhoneNumber: {},
    filteredPhoneNumbersCount: 0,
    filterList: [],
    relatedSkipSources: [],
}

const mutations = {
    SET_ALL_ITEMS(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.phoneNumbers = JSON.stringify(data);
        state.total = payload.total;
    },
    SET_RELATED_SKIP_SOURCES(state, payload) {
        state.relatedSkipSources = payload;
    },
    SET_FILTERS_COUNT_TABLE(state, payload) {
        state.filtersCountTable = payload;
    },
    EDIT_ITEM(state, payload) {
        const PHONE = JSON.parse(state.phoneNumbers)
        const findIndex = PHONE.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && PHONE.splice(findIndex, 1, { ...payload })
        state.phoneNumbers = JSON.stringify(PHONE);
    },
    DELETE_ITEM(state, payload) {
        const PHONE = JSON.parse(state.phoneNumbers)
        const findIndex = PHONE.findIndex(({ id }) => id === payload)
        findIndex !== -1 && PHONE.splice(findIndex, 1)
        state.phoneNumbers = JSON.stringify(PHONE);
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_ITEM(state, payload) {
        const PHONE = JSON.parse(state.phoneNumbers)
        const findIndex = PHONE.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && PHONE.splice(findIndex, 1, { ...payload })
        state.phoneNumbers = JSON.stringify(PHONE);
    },
    FILTER_PHONE_NUMBER(state, payload) {
        const filteredData = [...payload.data]
        filteredData.forEach(e => {
            // e.list_stack = e.lists.length;
            // e.total_sellers = e.sellers.length;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.filteredPhoneNumber = JSON.stringify(filteredData);
        state.filteredPhoneNumbersCount = payload.total;
    },
    SET_PHONE_NUMBER(state, payload) {
        state.phoneNumber = {...payload};
    },
    PHONE_FILTER_LIST(state, payload) {
        if(payload.data) {
            state.filterList = JSON.stringify(payload.data);            
        }
    },
    DELETE_MULTIPLE_ITEMS(state, payload) {
        const PHONE = JSON.parse(state.phoneNumbers)
        const findIndex =PHONE.findIndex(({ id }) => id === payload)
        findIndex !== -1 && PHONE.splice(findIndex, 1)
        state.phoneNumbers = JSON.stringify(PHONE);
    },
    VUEX_STORE(state) {
        state.phoneNumbers = [];
        state.total = 0;
        state.phoneNumber = {};
        state.filterList = [];
    },
}

const actions = {
    async filtersOnTable({commit, dispatch}, type) {
        return await api.get(`/phones/filtersOnTable?type=${type}`).then((response) => {
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
        return await api.get(`/phones/skipsources/${id}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.phoneSkipSources && response.phones.phoneSkipSources) {
                commit('SET_RELATED_SKIP_SOURCES', response.phoneSkipSources)
            }

            return response;
        });
    },
    async getAllPhoneNumbers({ commit, dispatch }, {page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/phones?page=${page}&perPage=${perPage}&sortBy=${sortBy}&search=${search}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.phones && response.phones.data) {
                commit('SET_ALL_ITEMS', response.phones)
            }

            return response
        })
    },
    async getPhoneNumber({commit}, data) {
        return await api.get(`/phones/full/${data}`).then((response) => {
            if (response && response.phone) {
                commit('SET_PHONE_NUMBER', response.phone)
            }

            return response
        })
    },
    async filterPhoneNumber({ commit }, param) {
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
        return await api.post(`/phones/filter`, {...data}).then((response) => {
            commit('FILTER_PHONE_NUMBER', response.phones)
            return response
        })
    },

    async  phoneFilterList({ commit }, param) {
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
        return await api.post(`/phones/filterList`, {...data}).then((response) => {
            commit('PHONE_FILTER_LIST', response.lists)
            return response
        })
    },
    async searchPhoneNumbers({ commit, dispatch }, {page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/phones?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.phones && response.phones.data) {
                commit('SET_ALL_ITEMS', response.phones)
            }

            return response
        })
    },
    async editPhoneNumber({ commit }, data) {
        delete data.user_name;
        return await api.put(`/phones/${data.id}`, {...data}).then((response) => {
            commit('EDIT_ITEM', data)
            return response
        })
    },
    async addPhoneNumber({ commit }, data) {
        return await api.post(`/phones`, {...data}).then((response) => {
            commit('ADD_ITEM', data)
            return response
        })
    },
    async deletePhoneNumber({ commit }, data) {
        return await api.deleteAPI(`/phones/${data}`).then((response) => {
            commit('DELETE_ITEM', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/phones`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    async deleteMultiplePhoneNumber({ commit }, data) {
        return await api.deleteAPI(`/phones/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_ITEMS', data)
            return response
        })
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

const getters = {
    fields: ({ fields }) => fields,
    phoneNumbers: ({ phoneNumbers }) => {
        if (typeof phoneNumbers === 'string') {
            return JSON.parse(phoneNumbers);
        }

        return [];
    },
    total: ({total}) => total,
    filteredPhoneNumbersCount: ({filteredPhoneNumbersCount}) => filteredPhoneNumbersCount,
    filterList : ({filterList}) => filterList,
    filtersCountTable: ({filtersCountTable}) => filtersCountTable,
    phoneNumber: ({phoneNumber}) => phoneNumber,
    filteredPhoneNumber: ({ filteredPhoneNumber }) => {
        if (typeof filteredPhoneNumber === 'string') {
            return JSON.parse(filteredPhoneNumber);
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
