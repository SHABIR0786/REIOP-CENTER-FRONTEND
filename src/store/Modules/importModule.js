import * as api from "../Services/api.js";

export const state = {
    emailFields: [],
    goldenAddressFields: [],
    listFields: [],
    phoneNumberFields: [],
    sellerFields: [],
    subjectFields: [],
    mappedHeader: [
        {key: 'fromField', label: 'From', sortable: true},
        {key: 'toField', label: 'To', sortable: true},
        {key: 'action', label: 'Remove', sortable: false}
    ],
    uploadedFields: [],
    uploaded: false,
    importVisibleFields: [],
    mappingTemplates:[{ value: null, text: 'Select Optional Mapping Template' }],
    mappingTemplate:{}
}

export const mutations = {
    SET_UPLOADED_FIELDS(state, payload) {
        state.uploadedFields = payload
    },
    SET_UPLOADED(state, payload) {
        state.uploaded = payload
    },
    SET_IMPORT_FIELDS(state, payload) {
        state.importVisibleFields = payload;

        state.subjectFields = [];
        state.sellerFields = [];
        state.phoneNumberFields = [];
        state.emailFields = [];
        state.goldenAddressFields = [];
        state.listFields = [];

        payload.forEach( item => {
           switch (item.section) {
               case 'subject':
                   if(item.field !== 'subject_market'){
                       state.subjectFields.push(item); // label
                   }
                   break;
               case  'seller':
                   state.sellerFields.push(item);
                   break;
               case 'phone':
                   state.phoneNumberFields.push(item);
                   break;
               case 'email':
                   state.emailFields.push(item);
                   break;
               case 'golden_address':
                   state.goldenAddressFields.push(item);
                   break;
               case 'list':
                   state.listFields.push(item);
                   break;
           }
        });
    },
    SET_MAPPINGTEMPLATES(state, payload) {
        state.mappingTemplates = payload
    },
    SET_MAPPINGTEMPLATE(state, payload) {
        state.mappingTemplate = payload
    },
    VUEX_STORE(state) {
        state.emailFields = [];
        state.goldenAddressFields = 0;
        state.listFields = {};
        state.phoneNumberFields = {};
        state.sellerFields = {};
        state.subjectFields = {};
        state.uploadedFields = {};
        state.importVisibleFields = {};
        state.mappingTemplates=[{ value: null, text: 'Select Optional Mapping Template' }];
        state.mappingTemplate={};
    },
}

export const actions = {
    setUploadedFields ({ commit }, data) {
        commit('SET_UPLOADED_FIELDS', data)
    },

    async uploadExcelData({ commit }, {data, url}) {
        return await api.post(`/${url}/`, data).then((response) => {
            commit('SET_UPLOADED', true)
            return response
        })
    },

    async uploadExcelDataV2({ commit }, {file, mappedItems, url, list, uploadType, skipSource, mapOrder,skipData,skipValidate, createUpdateMapping, mapping, selectedMappingTemplate, notes}) {
        const config = {headers: {'content-type': 'multipart/form-data; charset=UTF-8'}}

        let data = new FormData();
        data.append('file', file);
        data.append('section', url);
        data.append('list', JSON.stringify(list));
        data.append('skipData', JSON.stringify(skipData));
        data.append('skipSource', skipSource);
        data.append('importType', uploadType);
        data.append('skipValidate', skipValidate);
        data.append('createUpdateMapping', createUpdateMapping);
        data.append('mapping',JSON.stringify(mapping));
        data.append('selectedMappingTemplate', selectedMappingTemplate);
        data.append('notes', notes);
        
        const mapFieldsObj = {};
        mapOrder.forEach(map => {
            mapFieldsObj[map.toField] = map.fromField;
        })

        const mapObject = {};
        mappedItems.forEach(map => {
            mapObject[map.fromField] = map.toField;
        })
        const mapSequence  = {};
        mapOrder.forEach(map => {
            mapSequence[map.fromField] = map.toField;
        })
        data.append('mapOrder', JSON.stringify(mapSequence));
        data.append('mapFields', JSON.stringify(mapFieldsObj));
        data.append('map', JSON.stringify(mapObject));
        if (list === 'Combined Data'){
            return await api.post('/combinedUpload', data, config).then((response) => {
                commit('SET_UPLOADED', true)
                return response
            })
        }else {
            return await api.post('/upload', data, config).then((response) => {
                commit('SET_UPLOADED', true)
                return response
            })
        }
    },
    async loadVisibleFields ({ commit }) {
        return await api.get('/visible-labels').then((response) => {
            if (response && response.labels) {
                commit('SET_IMPORT_FIELDS', response.labels);
            }
        });
    },
    async loadMappingTemplates ({ commit },{import_type}) {
        return await api.get('/mapping-templates?import_type='+import_type).then((response) => {
            if (response && response.templates) {
                commit('SET_MAPPINGTEMPLATES', response.templates);
            }
        });
    },
    async getMappingTemplate ({ commit },{id}) {
        return await api.get('/mapping-template/'+id).then((response) => {
            if (response && response.template) {
                commit('SET_MAPPINGTEMPLATE', response.template);
            }
        });
    },
    
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

export const getters = {
    emailFields: ({ emailFields }) => emailFields,
    goldenAddressFields: ({ goldenAddressFields }) => goldenAddressFields,
    phoneNumberFields: ({ phoneNumberFields }) => phoneNumberFields,
    sellerFields: ({ sellerFields }) => sellerFields,
    subjectFields: ({ subjectFields }) => subjectFields,
    listFields: ({ listFields }) => listFields,
    uploadedFields: ({ uploadedFields }) => uploadedFields,
    mappedHeader: ({ mappedHeader }) => mappedHeader,
    schemas: ({ schemas }) => schemas,
    mappingTemplates: ({ mappingTemplates }) => mappingTemplates,
    mappingTemplate: ({ mappingTemplate }) => mappingTemplate,
    customViewVisibleFields: ({ importVisibleFields }) => importVisibleFields,  
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
