import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "ID", sortable: true},
        {key: "actions", stickyColumn: true, label: "Actions"},
        {key: "golden_address_address", label: "Golden Address", sortable: true},
        {key: "golden_address_address_line2", label: "Golden Address Line 2", sortable: true},
        {key: "golden_skip_source", label: "Skip Source", sortable: true},
        {key: "golden_address_city", label: "Golden City", sortable: true},
        {key: "golden_address_state", label: "Golden State", sortable: true},
        {key: "golden_address_zip", label: "Golden Zip", sortable: true},

        // Errors
        {key: "golden_error", label: "Error", sortable: true},
        {key: "golden_error_type", label: "Error Type", sortable: true},

        // Custom Fields

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    goldenAddresses: [],
    total: 0,
    goldenAddress: {},
    filtersCountTable: [],
    filteredGoldenAddress: {},
    filteredGoldenAddressesCount: 0,
    filterList: [],
    relatedSkipSources: [],
}

const mutations = {
    SET_ALL_GOLDEN_ADDRESSES(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            if(e.golden_skip_source.length > 0) {
            e.golden_skip_source = [...new Set(e.skip_sources.map(i=>i['golden_skip_source']))].join();
            }
        })
        state.goldenAddresses = JSON.stringify(data);
        state.total = payload.total;
    },
    SET_RELATED_SKIP_SOURCES(state, payload) {
        state.relatedSkipSources = payload;
    },
    SET_FILTERS_COUNT_TABLE(state, payload) {
        state.filtersCountTable = payload;
    },
    EDIT_GOLDEN_ADDRESS(state, payload) {
        const ADDRESS = JSON.parse(state.goldenAddresses)
        const findIndex = ADDRESS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && ADDRESS.splice(findIndex, 1, { ...payload })
        state.goldenAddresses = JSON.stringify(ADDRESS);
    },
    DELETE_GOLDEN_ADDRESS(state, payload) {
        const ADDRESS = JSON.parse(state.goldenAddresses)
        const findIndex = ADDRESS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && ADDRESS.splice(findIndex, 1)
        state.goldenAddresses = JSON.stringify(ADDRESS);
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    FILTER_GOLDEN_ADDRESS(state, payload) {
        const filteredData = [...payload.data]
        if(filteredData?.length > 0) {
        filteredData.forEach(e => {
            // e.list_stack = e.lists.length;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            if(e.golden_skip_source.length > 0) {
                e.golden_skip_source = [...new Set(e.skip_sources.map(i=>i['golden_skip_source']))].join();
            }
        })
        }
        state.filteredGoldenAddress =JSON.stringify(filteredData);
        state.filteredGoldenAddressesCount =payload.total;
    },
    GOLDEN_FILTER_LIST(state, payload) {
        if(payload.data) {
            state.filterList = JSON.stringify(payload.data);            
        }
    },

    SET_GOLDEN_ADDRESS(state, payload) {
        state.goldenAddress = {...payload};
    },
    ADD_GOLDEN_ADDRESS(state, payload) {
        const ADDRESS = JSON.parse(state.goldenAddresses)
        const findIndex = ADDRESS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && ADDRESS.splice(findIndex, 1, { ...payload })
        state.goldenAddresses = JSON.stringify(ADDRESS);
    },
    DELETE_MULTIPLE_GOLDEN_ADDRESS(state, payload) {
        const ADDRESS = JSON.parse(state.goldenAddresses)
        const findIndex = ADDRESS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && ADDRESS.splice(findIndex, 1)
        state.goldenAddresses = JSON.stringify(ADDRESS);
    },
    VUEX_STORE(state) {
        state.goldenAddresses = [];
        state.total = 0;
        state.filterList = [];
    },
}

const actions = {
    async filtersOnTable({commit, dispatch}, type) {
        return await api.get(`/golden-addresses/filtersOnTable?type=${type}`).then((response) => {
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
        return await api.get(`/golden-addresses/skipsources/${id}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.goldenAddressSkipSource) {
                commit('SET_RELATED_SKIP_SOURCES', response.goldenAddressSkipSource)
            }

            return response;
        });
    },
    async getAllGoldenAddresses({ commit, dispatch }, {page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/golden-addresses?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.goldenAddresses && response.goldenAddresses.data) {
                commit('SET_ALL_GOLDEN_ADDRESSES', response.goldenAddresses)
            }

            return response
        })
    },
    async searchGoldenAddresses({ commit, dispatch }, {page, perPage, search, sortBy, sortDesc}) {
        return await api.get(`/golden-addresses?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.goldenAddresses && response.goldenAddresses.data) {
                commit('SET_ALL_GOLDEN_ADDRESSES', response.goldenAddresses)
            }
            return response
        })
    },
    async getGoldenAddress({commit}, data) {
        return await api.get(`/golden-addresses/full/${data}`).then((response) => {
            if (response && response.goldenAddress) {
                commit('SET_GOLDEN_ADDRESS', response.goldenAddress)
            }
            return response
        })
    },
    async filterGoldenAddress({ commit }, param) {
        let data = Object.assign({}, JSON.parse(JSON.stringify(param)));
        // if(data.filter){
        //     let keys = Object.keys(data.filter);
        //     for(let i = 0; i < keys.length; i++) {
        //         let index =  data.filter[keys[i]].findIndex(x=>x == "Blank");
        //       if(index != -1) {
        //         data.filter[keys[i]][index] = " ";
        //       }
        //     }
        // }
        data.filter = JSON.stringify(data.filter);
        return await api.post(`/golden-addresses/filter`, {...data}).then((response) => {
            commit('FILTER_GOLDEN_ADDRESS', response.golden_addresses)
            return response
        })
    },
    async goldenFilterList({ commit }, param) {
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
        return await api.post(`/golden-addresses/filterList`, {...data}).then((response) => {
            commit('GOLDEN_FILTER_LIST', response.lists)
            return response
        })
    },
    async editGoldenAddress({ commit }, data) {
        delete data.user_name;
        return await api.put(`/golden-addresses/${data.id}`, {...data}).then((response) => {
            commit('EDIT_GOLDEN_ADDRESS', data)
            return response
        })
    },
    async addGoldenAddress({ commit }, data) {
        return await api.post(`/golden-addresses`, {...data}).then((response) => {
            commit('ADD_GOLDEN_ADDRESS', data)
            return response
        })
    },
    async deleteGoldenAddress({ commit }, data) {
        return await api.deleteAPI(`/golden-addresses/${data}`).then((response) => {
            commit('DELETE_GOLDEN_ADDRESS', data)
            return response
        })
    },
    async deleteMultipleGoldenAddress({ commit }, data) {
        return await api.deleteAPI(`/golden-addresses/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_GOLDEN_ADDRESS', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/golden-addresses`).then((response) => {
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
    goldenAddresses: ({ goldenAddresses }) => {
        if (typeof goldenAddresses === 'string') {
            return JSON.parse(goldenAddresses);
        }
        return [];
    },
    total: ({total}) => total,
    goldenAddress: ({goldenAddress}) => goldenAddress,
    filteredGoldenAddressesCount: ({filteredGoldenAddressesCount}) => filteredGoldenAddressesCount,
    filterList: ({filterList}) => filterList,
    filtersCountTable: ({filtersCountTable}) => filtersCountTable,
    filteredGoldenAddress: ({ filteredGoldenAddress }) => {
        if (typeof filteredGoldenAddress === 'string') {
            return JSON.parse(filteredGoldenAddress);
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
