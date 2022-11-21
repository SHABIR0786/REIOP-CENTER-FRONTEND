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
        {key:"user_name", label: "Uploaded By", sortable: true}
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
    subjectRunningList: [],
    sellerRunningList: [],
    subjectRelatedList: [],
    sellerRelatedList: [],
    allSkipSourceList:[],
    allSourceList:[],
    importPullList:[],
    //custom fields
    customField1List:[],
    customField2List:[],
    customField3List:[],
    customField4List:[],
    customField5List:[],
}

const mutations = {
   async SET_ALL_LISTS(state, payload) {
        const data = [...payload.data];
        let customFields = await setCustomListFields(data);
        if(customFields.length > 0) {
        let lastPullDateIndex = state.lists.findIndex(x=>x.key == "list_pull_date");
        let numofItemstoRemove = lastPullDateIndex - 7;
        state.lists.splice(7, numofItemstoRemove);
        state.lists.splice(7,0, ...payload);
        }
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
    SET_CUSTOM_FIELD_1_LIST(state, payload) {
        state.customField1List = payload
    },
    SET_CUSTOM_FIELD_2_LIST(state, payload) {
        state.customField2List = payload
    },
    SET_CUSTOM_FIELD_3_LIST(state, payload) {
        state.customField3List = payload
    },
    SET_CUSTOM_FIELD_4_LIST(state, payload) {
        state.customField4List = payload
    },
    SET_CUSTOM_FIELD_5_LIST(state, payload) {
        state.customField5List = payload
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
    SUBJECT_RUNNING_LIST(state, payload) {
        // payload.forEach(e =>{
        //     delete e.subjects;
        // })
        state.subjectRunningList = JSON.stringify(payload);
    },
    SUBJECT_RELATED_LIST(state, payload) {
        // payload.forEach(e => {
        //     delete e.subjects;
        // })
        state.subjectRelatedList = JSON.stringify(payload);
    },
    SELLER_RUNNING_LIST(state, payload) {
        state.sellerRunningList = JSON.stringify(payload);
    },
    SELLER_RELATED_LIST(state, payload) {
        state.sellerRelatedList = JSON.stringify(payload);
    },
    SET_CUSTOM_FIELDS(state, payload) {
        let lastPullDateIndex = state.fields.findIndex(x=>x.key == "list_pull_date");
        let listSourceIndex = state.fields.findIndex(x=>x.key == "list_source");
        let numofItemstoRemove = lastPullDateIndex - listSourceIndex;
        state.lists.splice(7, numofItemstoRemove);
        if(payload.length > 0) {
            state.lists.splice(7,0, ...payload);
        }
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
        state.importPullList = [];
        //custom fields
        state.customField1List = [];
        state.customField2List = [];
        state.customField3List = [];
        state.customField4List = [];
        state.customField5List = [];
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
    saveCustomField1List({ commit }, payload) {
        commit('SET_CUSTOM_FIELD_1_LIST', payload)
    },
    saveCustomField2List({ commit }, payload) {
        commit('SET_CUSTOM_FIELD_2_LIST', payload)
    },
    saveCustomField3List({ commit }, payload) {
        commit('SET_CUSTOM_FIELD_3_LIST', payload)
    },
    saveCustomField4List({ commit }, payload) {
        commit('SET_CUSTOM_FIELD_4_LIST', payload)
    },
    saveCustomField5List({ commit }, payload) {
        commit('SET_CUSTOM_FIELD_5_LIST', payload)
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
            console.log(response);
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
        let listHash = '';
        if(data.list_custom_field_1) {
          listHash+='_'+data.list_custom_field_1;
        }
        if(data.list_custom_field_2) {
          listHash+='_'+data.list_custom_field_2;
        }
        if(data.list_custom_field_3) {
          listHash+='_'+data.list_custom_field_3;
        }
        if(data.list_custom_field_4) {
          listHash+='_'+data.list_custom_field_4;
        }
        if(data.list_custom_field_5) {
          listHash+='_'+data.list_custom_field_5;
        }
        data.list_hash = data.list_market + '_' + data.list_type + '_' +  data.list_group + '_' + data.list_source+listHash;
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
    async getSubjectRunningList({ commit }, data) {
        return await api.post(`/lists/subjectRunningLists`, {...data}).then((response) => {
            commit('SUBJECT_RUNNING_LIST', response.subjectRunningList)
            return response
        })
    },
    async getSubjectRelatedList({ commit }, data) {
        return await api.post(`/lists/subjectRelatedLists`, {...data}).then(async (response) => {
            commit('SUBJECT_RELATED_LIST', response.subjectRelatedLists);
            let customfields = await setCustomListFields({lists:response.subjectRelatedLists});
            commit('SET_CUSTOM_FIELDS',customfields);
            return response
        })
    },
    async getSellerRelatedList({ commit }, data) {
        return await api.post(`/lists/sellerRelatedLists`, {...data}).then(async (response) => {
            if(response.sellerRelatedLists.length > 0) {
            commit('SELLER_RELATED_LIST', response.sellerRelatedLists);
            let customfields = await setCustomListFields({lists:response.subjectRelatedLists});
            commit('SET_CUSTOM_FIELDS',customfields);
            } else {
            commit('SELLER_RELATED_LIST', []);
            }
            return response
        })
    },
    async getSellerRunningList({ commit }, data) {
        return await api.post(`/lists/sellerRunningLists`, {...data}).then((response) => {
            if(response.sellerRunningLists.length > 0) {
            commit('SELLER_RUNNING_LIST', response.sellerRunningLists);
            } else {
            commit('SELLER_RUNNING_LIST', []);
            }
            return response
        })
    },
    async getPhoneRelatedList({ commit }, data) {
        return await api.post(`/lists/phoneRelatedLists`, {...data}).then(async (response) => {
            if(response.phoneRelatedLists.length > 0) {
                commit('SELLER_RELATED_LIST', response.phoneRelatedLists);
                let customfields = await setCustomListFields({lists:response.subjectRelatedLists});
                commit('SET_CUSTOM_FIELDS',customfields);
            } else {
                commit('SELLER_RELATED_LIST', [])
            }
            return response
        })
    },
    async getPhoneRunningList({ commit }, data) {
        return await api.post(`/lists/phoneRunningLists`, {...data}).then((response) => {
            if(response.phoneRunningLists.length > 0) {
                commit('SELLER_RUNNING_LIST', response.phoneRunningLists);
            } else {
                commit('SELLER_RUNNING_LIST', []);
            }
            return response
        })
    },
    async getEmailRelatedList({ commit }, data) {
        return await api.post(`/lists/emailRelatedLists`, {...data}).then(async (response) => {
            if(response.emailRelatedLists.length > 0) {
                commit('SELLER_RELATED_LIST', response.emailRelatedLists);
                let customfields = await setCustomListFields({lists:response.subjectRelatedLists});
                commit('SET_CUSTOM_FIELDS',customfields);
            } else {
                commit('SELLER_RELATED_LIST', [])
            }
            return response
        })
    },
    async getEamilRunningList({ commit }, data) {
        return await api.post(`/lists/emailRunningLists`, {...data}).then((response) => {
            if(response.emailRunningLists.length > 0) {
                commit('SELLER_RUNNING_LIST', response.emailRunningLists);
            } else {
                commit('SELLER_RUNNING_LIST', []);
            }
            return response
        })
    },
    async getGoldenRelatedList({ commit }, data) {
        return await api.post(`/lists/goldenRelatedLists`, {...data}).then(async (response) => {
            if(response.goldenRelatedLists.length > 0) {
                commit('SELLER_RELATED_LIST', response.goldenRelatedLists);
                let customfields = await setCustomListFields({lists:response.subjectRelatedLists});
                commit('SET_CUSTOM_FIELDS', customfields);
            } else {
                commit('SELLER_RELATED_LIST', [])
            }
            return response
        })
    },
    async getGoldenRunningList({ commit }, data) {
        return await api.post(`/lists/goldenRunningLists`, {...data}).then((response) => {
            if(response.goldenRunningLists.length > 0) {
            commit('SELLER_RUNNING_LIST', response.goldenRunningLists);
            } else {
            commit('SELLER_RUNNING_LIST', []);
            }
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
    async checkListForDeleteItem({ commit }, {id, list_type}) {
        return await api.get(`/checkListMerge?id=${id}&list_type=${list_type}`).then((response) => {
            commit('just_test', id)
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
    fields: state => state.fields,
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
    customField1List: state => state.customField1List,
    customField2List: state => state.customField2List,
    customField3List: state => state.customField3List,
    customField4List: state => state.customField4List,
    customField5List: state => state.customField5List,

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
    list: ({ list }) => {
        if (typeof list === 'string') {
            return JSON.parse(list);
        }
        return [];
    },
    subjectRunningList: ({ subjectRunningList }) => {
        if (typeof subjectRunningList === 'string') {
            return JSON.parse(subjectRunningList);
        }
        return [];
    },
    sellerRunningList: ({ sellerRunningList }) => {
        if( typeof sellerRunningList === 'string') {
            return JSON.parse(sellerRunningList);
        }
        return [];
    },
    subjectRelatedList: ({ subjectRelatedList }) => {
        if (typeof subjectRelatedList === 'string') {
            return JSON.parse(subjectRelatedList);
        }
        return [];
    },
    sellerRelatedList: ({ sellerRelatedList }) => {
        if( typeof sellerRelatedList === 'string') {
            return JSON.parse(sellerRelatedList);
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
function getCustomField(field,labels) {
    let index = labels.findIndex(x=>x.field == field);
    if(index != -1) {
      if(labels[index].label) {
        return labels[index].label;
      } else {
      return field;
      }
    } else {
      return field;
    }
}

async function setCustomListFields(payload) {
    const instance = this;
    await api.get('/visibleCustomFields').then((response) => {
            instance.labels = response.labels;
    });
    const data = payload.lists;
    const fields = [];
    data.forEach(e => {
        //custom fields
        if(e.list_custom_field_1) {
            let index = fields.findIndex(({ key }) => key == "list_custom_field_1");
            if( index == -1) {
                let label = getCustomField('list_custom_field_1',instance.labels); 
                fields.push({key:"list_custom_field_1", label: label, sortable: true});
            }
        }
        if(e.list_custom_field_2) {
            let index = fields.findIndex(({ key }) => key == "list_custom_field_2");
            if(index == -1) {
                let label = getCustomField('list_custom_field_2',instance.labels); 
                fields.push({key:"list_custom_field_2", label: label, sortable: true});
            }
        }
        if(e.list_custom_field_3) {
            let index = fields.findIndex(({ key }) => key == "list_custom_field_3");
            if(index == -1) {
                let label = getCustomField('list_custom_field_3',instance.labels);
                fields.push({key:"list_custom_field_3", label: label, sortable: true});
            }
        }
        if(e.list_custom_field_4) {
            let index = fields.findIndex(({ key }) => key == "list_custom_field_4");
            if(index == -1) {
                let label = getCustomField('list_custom_field_4',instance.labels); 
                fields.push({key:"list_custom_field_4", label: label, sortable: true});
            }
        }
        if(e.list_custom_field_5) {
            let index = fields.findIndex(({ key }) => key == "list_custom_field_5");
            if(index == -1) {
                let label = getCustomField('list_custom_field_5',instance.labels); 
                fields.push({key:"list_custom_field_5", label: label, sortable: true});
            }
        }
    });
    return fields;
}
