import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "ID", sortable: true},
        {key:"actions", stickyColumn: true, label: "Actions"},
        {key:"subjects_unique_count", label: "Unique Subjects", sortable: true},
        {key:"total_running_lists", label: "Total Running Lists", sortable: true},
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
    pageTo:0,
    pageFrom:0,
    sellers: [],
    tabData: [],
    marketList: [],
    groupList: [],
    typeList: [],
    sourceList: [],
    skipSourceList: [],
    list: {},
    subjectRelatedList: [],
    sameDate:null,
    sameSource:null,
    allSkipSourceList:[],
    allSourceList:[],
    importPullList:[],
}

const mutations = {
    SET_ALL_LISTS(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.list_total_subject = e.subjects_unique_count;
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.lists = JSON.stringify(data);
        state.pageTo = payload.to;
        state.pageFrom = payload.from;
        state.total = payload.total;
    },
    SET_IMPORT_PULL_LIST(state, payload) {
        const data = [...payload.data];
        state.importPullList = JSON.stringify(data);
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
    RELATED_IMPORTS(state, payload) {
        payload.data.forEach(data => {
            state.tabData.data.find(el => el.list_run_year === data.list_run_year && el.list_run_month === data.list_run_month).imports = payload.data
        })
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
    SET_SOURCE_LIST(state, payload) {
        state.sourceList = payload
    },
    ADD_SOURCE_LIST(state, payload) {
        
        const allSourceList = JSON.parse(state.allSourceList)
        payload.created_at = payload.created_at.split('T')[0];
        payload.updated_at = payload.updated_at.split('T')[0];
        allSourceList.push(payload)
        state.allSourceList = JSON.stringify(allSourceList)
    },
    DELETE_LIST_SOURCE(state, payload) {
        const allSourceList = JSON.parse(state.allSourceList)
        const findIndex = allSourceList.findIndex(({ id }) => id === payload)
        findIndex !== -1 && allSourceList.splice(findIndex, 1)
        state.allSourceList = JSON.stringify(allSourceList)

    },
    DELETE_LIST_SKIP_SOURCE(state, payload) {
        const allSkipSourceList = JSON.parse(state.allSkipSourceList)

        const findIndex = allSkipSourceList.findIndex(({ id }) => id === payload)
        findIndex !== -1 && allSkipSourceList.splice(findIndex, 1)
        state.allSkipSourceList = JSON.stringify(allSkipSourceList)

    },
    ADD_SKIP_SOURCE_LIST(state, payload) {
        
        const allSkipSourceList = JSON.parse(state.allSkipSourceList)
        payload.created_at = payload.created_at.split('T')[0];
        payload.updated_at = payload.updated_at.split('T')[0];
        allSkipSourceList.push(payload)
        state.allSkipSourceList = JSON.stringify(allSkipSourceList)
    },
   EDIT_SOURCE_LIST(state, payload) {
       const allSourceList = JSON.parse(state.allSourceList)
       allSourceList.find(el => el.id === payload.id).list_source = payload.list_source
       state.allSourceList = JSON.stringify(allSourceList)
   },
    SET_SKIP_SOURCE_LIST(state, payload) {
        state.skipSourceList = payload
    },
    EDIT_SKIP_SOURCE_LIST(state, payload) {
        const allSkipSourceList = JSON.parse(state.allSkipSourceList)
        allSkipSourceList.find(el => el.id === payload.id).list_skip_source = payload.list_skip_source
        state.allSkipSourceList = JSON.stringify(allSkipSourceList)
    },
    SET_SKIP_SOURCE_CHOOSE(state, payload) {
        state.sameSource = payload
    },
    SET_SKIP_DATE_CHOOSE(state, payload) {
        state.sameDate = payload
    },
    GET_SKIP_SOURCE_LIST(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        });
        state.allSkipSourceList = JSON.stringify(data);
    },
    GET_SOURCE_LIST(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        });

        state.allSourceList = JSON.stringify(data);
    },
    SUBJECT_RELATED_LIST(state, payload) {
        payload.data.forEach(e =>{
            delete e.subjects;
        })
        state.subjectRelatedList = JSON.stringify(payload.data);
    },
    just_test() {
    },
    VUEX_STORE(state) {
        state.lists = [];
        state.sellers = [];
        state.tabData = [];
        state.marketList = [];
        state.groupList = [];
        state.typeList = [];
        state.sourceList = [];
        state.skipSourceList = [];
        state.total = 0;
        state.sameDate = null;
        state.sameSource = null;
        state.importPullList = [];
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
        commit('SET_SOURCE_LIST', payload)
    },
    saveSkipSourceList({ commit }, payload) {
        commit('SET_SKIP_SOURCE_LIST', payload)
    },
    saveSkipSourceChoose({ commit }, payload) {
        commit('SET_SKIP_SOURCE_CHOOSE', payload)
    },
    saveSkipDateChoose({ commit }, payload) {
        commit('SET_SKIP_DATE_CHOOSE', payload)
    },
    async getImportPullLists({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/getImportPullLists?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.lists && response.lists.data) {
                commit('SET_IMPORT_PULL_LIST', response.lists)
            }
            return response;
        })
    },
    
    async getAllLists({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/lists?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.lists && response.lists.data) {
                commit('SET_ALL_LISTS', response.lists)
            }

            return response
        })
    },
    async getSourceListFromDB({ commit }) {
        return await api.get(`/lists/source`).then((response) => {
            if (response ) {
                commit('GET_SOURCE_LIST', response.sourceList)
            }
            return response
        })
    },
    async addListSource({ commit }, data) {
        let source_list_type = data.source_list_type;

        delete data.source_list_type;
        return await api.post(`/lists/addListSource`,{...data}).then((response) => {
            if(source_list_type === 'list_source'){
                commit('ADD_SOURCE_LIST', response.list);
            }else if(source_list_type === 'list_skip_source'){
                commit('ADD_SKIP_SOURCE_LIST', response.list);
            }
            
            return response
        })
    },
    async editSource({ commit }, data) {
        return await api.post(`/lists/editSource`,{...data}).then((response) => {
            if (response && response.sourceType === 'list_source') {
                commit('EDIT_SOURCE_LIST', data)
            }else if(response && response.sourceType === 'list_skip_source'){
                commit('EDIT_SKIP_SOURCE_LIST', data)
            }
            return response
        })
    },
    async getSkipSourceListFromDB({ commit }) {
       return await api.get(`/lists/skipSource`).then((response) => {
           if (response ) {
               commit('GET_SKIP_SOURCE_LIST', response.skipSourceList)
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
                commit('SET_ALL_LISTS', response.lists)
            }

            return response
        })
    },
    async editList({ commit }, data) {
        delete data.user_name;
        delete data.list_total_subject;
        delete data.total_running_lists;
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

    async currentModal({ commit }, {data, page, perPage,list_id}) {
        return await api.get(`/lists/modal?listHash=${data}&page=${page}&perPage=${perPage}&list_id=${list_id}`, {...data}).then((response) => {
            commit('SHOW_TABS', response.tabData)
            return response
        })
    },
    async relatedImports({ commit }, {data,runYear,runMonth, page, perPage}) {
        return await api.get(`/lists/relatedImports?listHash=${data}&runYear=${runYear}&runMonth=${runMonth}&page=${page}&perPage=${perPage}`, {...data}).then((response) => {
            commit('RELATED_IMPORTS', response.relatedImports)
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
    async checkListForDeleteItem({ commit }, data) {
        return await api.get(`/lists/checkForDeleteList/${data}`).then((response) => {
            commit('just_test', data)
            return response
        })
    },
    async UpdateBeforeDeleteList({ commit }, data) {
        let delete_list_type = data.delete_list_type;
        
        return await api.post(`/lists/UpdateBeforeDeleteList`, {...data}).then((response) => {
            if(delete_list_type == 'list_source'){
                commit('DELETE_LIST_SOURCE', data.previous_id)
            }else if(delete_list_type == 'list_skip_source'){
                commit('DELETE_LIST_SKIP_SOURCE', data.previous_id)
            }
            return response
        })
    },
    async MergeListSource({ commit }, data) {
        // let merge_list_type = data.merge_list_type;
        
        return await api.post(`/lists/MergeListSource`, {...data}).then((response) => {
            // if(merge_list_type == 'list_source'){
            //     commit('DELETE_LIST_SOURCE', data.previous_id)
            // }else if(merge_list_type == 'list_skip_source') {
            //     commit('DELETE_LIST_SKIP_SOURCE', data.previous_id)
            // }
            commit('just_test', data)
            return response
        })
    },
    async deleteListSource({ commit }, data) {
        return await api.deleteAPI(`/lists/${data}`).then((response) => {
            commit('DELETE_LIST_SOURCE', data)
            return response
        })
    },
    async deleteListSkipSource({ commit }, data) {
        return await api.deleteAPI(`/lists/${data}`).then((response) => {
            commit('DELETE_LIST_SKIP_SOURCE', data)
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
    importPullList: ({ importPullList }) => {
        if (typeof importPullList === 'string') {
            return JSON.parse(importPullList);
        }
        return [];
    },
    total: ({total}) => total,
    pageTo: ({pageTo}) => pageTo,
    pageFrom: ({pageFrom}) => pageFrom,
    totalCurrentMonth: ({totalCurrentMonth}) => totalCurrentMonth,
    tabData: state => state.tabData,
    marketList: state => state.marketList,
    groupList: state => state.groupList,
    typeList: state => state.typeList,
    sourceList: state => state.sourceList,
    skipSourceList: state => state.skipSourceList,
    skipSourceListFromDB: ({ allSkipSourceList }) => {
        if (typeof allSkipSourceList === 'string') {
            return JSON.parse(allSkipSourceList);
        }
        return [];
    },
    sourceListFromDB: ({ allSourceList }) => {
        if (typeof allSourceList === 'string') {
            return JSON.parse(allSourceList);
        }
        return [];
    },
    sameDate: state => state.sameDate,
    sameSource: state => state.sameSource,
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
