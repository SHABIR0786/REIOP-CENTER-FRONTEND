import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "ID", sortable: true},
        {key: "actions", label: "Actions"},

        {key: "seller_total_subjects", label: "Total Subjects", sortable: true},
        {key: "seller_total_phones", label: "Total Phones", sortable: true},
        {key: "seller_total_emails", label: "Total Emails", sortable: true},

        {key: "seller_first_name", label: "First Name", sortable: true},
        {key: "seller_middle_name", label: "Middle Name", sortable: true},
        {key: "seller_last_name", stickyColumn: true, label: "Last Name", sortable: true},

        {key: "seller_mailing_address", label: "Mailing Address", sortable: true},
        {key: "seller_mailing_address_line2", label: "Mailing Address Line2", sortable: true},
        {key: "seller_mailing_state", label: "Mailing State", sortable: true},
        {key: "seller_mailing_city", label: "Mailing City", sortable: true},
        {key: "seller_mailing_zip", label: "Mailing Zip", sortable: true},
        {key: "seller_company_owned", label: "Company Owned", sortable: true},

        // Errors
        {key: "seller_error", label: "Error", sortable: true},
        {key: "seller_error_type", label: "Error Type", sortable: true},

        // Custom Fields
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},

    ],
    sellers: [],
    total: 0,
    seller: {},
    filtersCountTable: [],
    filteredSeller: {},
    filteredSellersCount: 0,
    filterList: [],
}

const mutations = {
    SET_ALL_SELLERS(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.sellers = JSON.stringify(data);
        state.total = payload.total;

    },
    EDIT_SELLER(state, payload) {
        const SELLER = JSON.parse(state.sellers)
        const findIndex = SELLER.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SELLER.splice(findIndex, 1, { ...payload })
        state.sellers = JSON.stringify(SELLER)
    },
    DELETE_SELLER(state, payload) {
        const SELLER = JSON.parse(state.sellers)
        const findIndex = SELLER.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SELLER.splice(findIndex, 1)
        state.sellers = JSON.stringify(SELLER)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_SELLER(state, payload) {
        const SELLER = JSON.parse(state.sellers)
        const findIndex = SELLER.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SELLER.splice(findIndex, 1, { ...payload })
        state.sellers = JSON.stringify(SELLER)
    },
    SET_FILTERS_COUNT_TABLE(state, payload) {
        state.filtersCountTable = payload;
    },
    FILTER_SELLER(state, payload) {
        if(payload){
            const filteredData = [...payload.data]
            filteredData.forEach(e => {
                e.list_stack = e.lists.length;
                e.total_subjects = e.subjects.length;
                e.created_at = e.created_at.split('T')[0];
                e.updated_at = e.updated_at.split('T')[0];
            })
            state.filteredSeller = JSON.stringify(filteredData);
            state.filteredSellersCount = payload.total;
        } else {
            state.filteredSeller = [];
            state.filteredSellersCount = 0;
        }
    },
    SET_SELLER(state, payload) {
        state.seller = JSON.stringify(payload);
    },
    SELLER_FILTER_LIST(state, payload) {
        if(payload.data) {
            state.filterList = JSON.stringify(payload.data);            
        }
    },
    DELETE_MULTIPLE_SELLERS(state, payload) {
        const SELLER = JSON.parse(state.sellers)
        const findIndex = SELLER.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SELLER.splice(findIndex, 1)
        state.sellers = JSON.stringify(SELLER)
    },
    VUEX_STORE(state) {
        state.sellers = [];
        state.total = 0;
        state.seller = {};
        state.filterList = [];
    },
}

const actions = {
    async filtersOnTable({commit, dispatch}, type) {
        return await api.get(`/sellers/filtersOnTable?type=${type}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.filtersCount) {
                commit('SET_FILTERS_COUNT_TABLE', response.filtersCount)
            }

            return response
        })
    },
    async getAllSellers({ commit }, {page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/sellers?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.sellers && response.sellers.data) {
                commit('SET_ALL_SELLERS', response.sellers)
            }

            return response
        })
    },
    async getSeller({commit}, data) {
        return await api.get(`/sellers/full/${data}`).then((response) => {
            if (response && response.seller) {
                commit('SET_SELLER', response.seller)
            }
            return response
        })
    },
    async searchSellers({ commit }, {page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/sellers?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.sellers && response.sellers.data) {
                commit('SET_ALL_SELLERS', response.sellers)
            }

            return response
        })
    },
    async filterSeller({ commit }, param) {
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
        return await api.post(`/sellers/filter`, {...data}).then((response) => {
            commit('FILTER_SELLER', response.sellers)
            return response
        })
    },
    
    async SellerfilterList({ commit }, param) {
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
        return await api.post(`/sellers/filterList`, {...data}).then((response) => {
            commit('SELLER_FILTER_LIST', response.lists)
            return response
        })
    },
    async editSeller({ commit }, data) {
        const updatedData = Object.assign({}, data);
        delete updatedData.subjects;
        delete updatedData.emails;
        delete updatedData.phones;
        delete updatedData.lists;
        delete updatedData.golden_addresses;
        delete updatedData.subject_id;
        delete updatedData.seller_total_emails;
        delete updatedData.seller_total_phones;
        delete updatedData.seller_total_subjects;
        delete updatedData.user_name;

        return await api.put(`/sellers/${data.id}`, updatedData).then((response) => {
            commit('EDIT_SELLER', data)
            return response
        })
    },
    async addSeller({ commit }, data) {
        return await api.post(`/sellers`, {...data}).then((response) => {
            commit('ADD_SELLER', data)
            return response
        })
    },
    async deleteSeller({ commit }, data) {
        return await api.deleteAPI(`/sellers/${data}`).then((response) => {
            commit('DELETE_SELLER', data)
            return response
        })
    },
    async deleteMultipleSellers({ commit }, data) {
        return await api.deleteAPI(`/sellers/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_SELLERS', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/sellers`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    // eslint-disable-next-line no-empty-pattern
    async attachment({}, {subject_id, seller_id}) {
        return await api.post(`/attach`, {subject_id, seller_id}).then((response) => {
           console.log('attached', response);
        })
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

const getters = {
    fields: ({ fields }) => fields,
    sellers: ({ sellers }) => {
        if (typeof sellers === 'string') {
            return JSON.parse(sellers);
        }
        return [];
    },
    total: ({total}) => total,
    seller: ({ seller }) => {
        if (typeof seller === 'string') {
            return JSON.parse(seller);
        }
        return [];
    },

    filteredSellersCount: ({filteredSellersCount}) => filteredSellersCount,
    filterList : ({filterList}) => filterList,
    filtersCountTable: ({filtersCountTable}) => filtersCountTable,
    filteredSeller: ({ filteredSeller }) => {
        if (typeof filteredSeller === 'string') {
            return JSON.parse(filteredSeller);
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
