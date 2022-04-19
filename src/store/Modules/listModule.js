import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "ID", sortable: true},
        {key:"actions", stickyColumn: true, label: "Actions"},
        {key:"list_total_subject", label: "Unique Subjects", sortable: true},
        {key:"list_total_individual_list", label: "Total Individual Lists", sortable: true},
        {key:"list_market", label: "Markets", sortable: true},
        {key:"list_group", label: "Group", sortable: true},
        {key:"list_type", label: "Type", sortable: true},
        {key:"list_source", label: "Source", sortable: true},

        // Custom fields
        {key:"list_pull_date", label: "Last Pull Date", sortable: true},
        {key:"created_at", label: "Upload Date", sortable: true},
        {key:"updated_at", label: "Last Edit Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},

    ],
    lists: [],
    total: 0,
    sellers: [],
    tabData: [],
    marketList: [],
    groupList: [],
    typeList: [],
    sourceList: [],
    list: [],
    subjectRelatedList: [],
}

const mutations = {
    SET_ALL_LISTS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.list_total_subject = e.subjects_count;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.lists = JSON.stringify(data);
    },
    EDIT_LIST(state, payload) {
        const LIST = JSON.parse(state.lists)
        const findIndex = LIST.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && LIST.splice(findIndex, 1, { ...payload })
        state.lists = JSON.stringify(LIST);
    },
    DELETE_LIST(state, payload) {
        const LIST = JSON.parse(state.lists)
        const findIndex = LIST.findIndex(({ id }) => id === payload)
        findIndex !== -1 && LIST.splice(findIndex, 1)
        state.lists = JSON.stringify(LIST);
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    GET_TOTAL_CURRENT_MONTH(state, payload) {
        state.totalCurrentMonth = payload;
    },

    ADD_LIST(state, payload) {
        const LIST = JSON.parse(state.lists)
        const findIndex = LIST.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && LIST.splice(findIndex, 1, { ...payload })
        state.lists = JSON.stringify(LIST);
    },
    SHOW_TABS(state, payload) {
        state.tabData = payload;
    },
    DELETE_MULTIPLE_LISTS(state, payload) {
        const LIST = JSON.parse(state.lists)
        const findIndex = LIST.findIndex(({ id }) => id === payload)
        findIndex !== -1 && LIST.splice(findIndex, 1)
        state.lists = JSON.stringify(LIST);
    },
    SET_LIST(state, payload) {
        state.list =JSON.stringify(payload.list);
    },
    SET_MARKET_LIST(state, payload) {
        state.marketList = payload
    },
    SET_GROUP_LIST(state, payload) {
        state.groupList = payload
    },
    SET_TYPE_LIST(state, payload) {
        state.typeList = payload
    },
    SET_SOYRCE_LIST(state, payload) {
        state.sourceList = payload
    },
    SUBJECT_RELATED_LIST(state, payload) {
        payload.data.forEach(e =>{
            delete e.subjects;
        })
        state.subjectRelatedList = JSON.stringify(payload.data);
    },
    VUEX_STORE(state) {
        state.lists = [];
        state.sellers = [];
        state.tabData = [];
        state.marketList = [];
        state.groupList = [];
        state.typeList = [];
        state.sourceList = [];
        state.total = 0;
    },
}

const actions = {
    saveMarketList({ commit }, payload) {
        commit('SET_MARKET_LIST', payload)
    },
    saveGroupList({ commit }, payload) {
        commit('SET_GROUP_LIST', payload)
    },
    saveTypeList({ commit }, payload) {
        commit('SET_TYPE_LIST', payload)
    },
    saveSourceList({ commit }, payload) {
        commit('SET_SOYRCE_LIST', payload)
    },
    async getAllLists({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/lists?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.lists && response.lists.data) {
                commit('SET_ALL_LISTS', response.lists.data)
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
        delete data.user_name;
        delete data.list_total_subject;
        delete data.list_total_individual_list;
        delete data.subjects_count;
        delete data.sellers_count;
        delete data.phones_count;
        delete data.golden_addresses_count;
        delete data.emails_count;
        delete data.run_month;
        delete data.run_year;
        data.list_hash = data.list_market + '_' + data.list_type + '_' +  data.list_group + '_' + data.list_source
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

    async getSubjectRelatedList({ commit }, data) {
        return await api.post(`/lists/subjectRelatedLists`, {...data}).then((response) => {
            commit('SUBJECT_RELATED_LIST', response.subjectRelatedList)
            return response
        })
    },

    async currentModal({ commit }, {data, page, perPage}) {
        return await api.get(`/lists/modal?listHash=${data}&page=${page}&perPage=${perPage}`, {...data}).then((response) => {
            commit('SHOW_TABS', response.tabData)
            return response
        })
    },
    async getSelectedList({commit}, data) {
        return await api.get(`/lists/selected/${data}`).then((response) => {
            if (response ) {
                commit('SET_LIST', response)
            }
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
    },
    async getTotalCurrentMonth({ commit }) {
        return await api.get(`/totals/listsCurrentMonth`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL_CURRENT_MONTH', response.count);
            }
            return response
        })
    },
    async deleteMultipleLists({ commit }, data) {
        return await api.deleteAPI(`/lists/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_LISTS', data)
            return response
        })
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

const getters = {
    fields: ({ fields }) => fields,
    lists: ({ lists }) => {
        if (typeof lists === 'string') {
            return JSON.parse(lists);
        }
        return [];
    },
    total: ({total}) => total,
    totalCurrentMonth: ({totalCurrentMonth}) => totalCurrentMonth,
    tabData: state => state.tabData,
    marketList: state => state.marketList,
    groupList: state => state.groupList,
    typeList: state => state.typeList,
    sourceList: state => state.sourceList,
    list: ({ list }) => {
        if (typeof list === 'string') {
            return JSON.parse(list);
        }
        return [];
    },
    subjectRelatedList: ({ subjectRelatedList }) => {
        if (typeof subjectRelatedList === 'string') {
            return JSON.parse(subjectRelatedList);
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
