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
    sectionVisibleFields: [],
    mappingTemplates:[{ value: null, text: 'Select Optional Mapping Template' }],
    mappingTemplate:{},
    additionalFilterFieldsTypes: [
    {column:"subject_address",type:"String"},
    {column:"subject_city",type:"String"},
    {column:"subject_state",type:"String"},
    {column:"subject_zip",type:"String"},
    {column:"subject_full_address",type:"String"},
    {column:"subject_county",type:"String"},
    {column:"subject_market",type:"String"},
    {column:"subject_age",type:"String"},
    {column:"subject_type",type:"String"},
    {column:"subject_address_line2",type:"String"},
    {column:"subject_pull_date",type:"Date"},
    {column:"subject_last_marketed_date",type:"Date"},
    {column:"subject_last_exported_date",type:"Date"},
    {column:"subject_skip_trace_date",type:"Date"},
    {column:"subject_custom_field_1",type:"String"},
    {column:"subject_custom_field_2",type:"String"},
    {column:"subject_custom_field_3",type:"String"},
    {column:"subject_custom_field_4",type:"String"},
    {column:"subject_custom_field_5",type:"String"},
    {column:"subject_custom_field_6",type:"String"},
    {column:"subject_custom_field_7",type:"String"},
    {column:"subject_custom_field_8",type:"String"},
    {column:"subject_custom_field_8",type:"String"},
    {column:"subject_custom_field_10",type:"String"},
    {column:"subject_custom_field_11",type:"String"},
    {column:"subject_custom_field_12",type:"String"},
    {column:"subject_custom_field_13",type:"String"},
    {column:"subject_custom_field_14",type:"String"},
    {column:"subject_custom_field_15",type:"String"},
    {column:"subject_custom_field_16",type:"String"},
    {column:"subject_custom_field_17",type:"String"},
    {column:"subject_custom_field_18",type:"String"},
    {column:"subject_custom_field_19",type:"String"},
    {column:"subject_error",type:"Boolean"},
    {column:"subject_error_type",type:"Options"},
    // Seller Fields
    {column:"seller_first_name",type:"String"},
    {column:"seller_last_name",type:"String"},
    {column:"seller_full_name",type:"String"},
    {column:"seller_middle_name",type:"String"},
    {column:"seller_mailing_address",type:"String"},
    {column:"seller_mailing_city",type:"String"},
    {column:"seller_mailing_state",type:"String"},
    {column:"seller_mailing_zip",type:"String"},
    {column:"seller_full_mailing_address",type:"String"},
    {column:"seller_mailing_address_line2",type:"String"},
    {column:"seller_company_owned",type:"String"},
    {column:"seller_pull_date",type:"Date"},
    {column:"seller_last_marketed_date",type:"Date"},
    {column:"seller_last_exported_date",type:"Date"},
    {column:"attempted_skip_trace_sources",type:"String"},
    {column:"attempted_skip_traces",type:"String"},
    {column:"has_skip_trace_data",type:"String"},
    {column:"seller_custom_field_1",type:"String"},
    {column:"seller_custom_field_2",type:"String"},
    {column:"seller_custom_field_3",type:"String"},
    {column:"seller_custom_field_4",type:"String"},
    {column:"seller_custom_field_5",type:"String"},
    {column:"seller_custom_field_6",type:"String"},
    {column:"seller_custom_field_7",type:"String"},
    {column:"seller_custom_field_8",type:"String"},
    {column:"seller_custom_field_9",type:"String"},
    {column:"seller_custom_field_10",type:"String"},
    {column:"seller_custom_field_11",type:"String"},
    {column:"seller_custom_field_12",type:"String"},
    {column:"seller_custom_field_13",type:"String"},
    {column:"seller_custom_field_14",type:"String"},
    {column:"seller_custom_field_15",type:"String"},
    {column:"seller_custom_field_16",type:"String"},
    {column:"seller_custom_field_17",type:"String"},
    {column:"seller_custom_field_18",type:"String"},
    {column:"seller_custom_field_19",type:"String"},
    {column:"seller_custom_field_20",type:"String"},
    {column:"seller_error",type:"Boolean"},
    {column:"seller_error_type",type:"Options"},
    // Phone Fields
    {column:"phone_number",type:"String"},
    {column:"phone_type",type:"String"},
    {column:"phone_validity",type:"String"},
    {column:"phone_skip_source",type:"String"},
    {column:"phone_skip_date",type:"Date"},
    {column:"phone_pull_date",type:"Date"},
    {column:"phone_last_marketed_date",type:"Date"},
    {column:"phone_last_exported_date",type:"Date"},
    {column:"phone_custom_field_1",type:"String"},
    {column:"phone_custom_field_2",type:"String"},
    {column:"phone_custom_field_3",type:"String"},
    {column:"phone_custom_field_4",type:"String"},
    {column:"phone_custom_field_5",type:"String"},
    {column:"phone_custom_field_6",type:"String"},
    {column:"phone_custom_field_7",type:"String"},
    {column:"phone_custom_field_8",type:"String"},
    {column:"phone_custom_field_9",type:"String"},
    {column:"phone_custom_field_10",type:"String"},
    {column:"phone_custom_field_11",type:"String"},
    {column:"phone_custom_field_12",type:"String"},
    {column:"phone_custom_field_13",type:"String"},
    {column:"phone_custom_field_14",type:"String"},
    {column:"phone_custom_field_15",type:"String"},
    {column:"phone_custom_field_16",type:"String"},
    {column:"phone_custom_field_17",type:"String"},
    {column:"phone_custom_field_18",type:"String"},
    {column:"phone_custom_field_19",type:"String"},
    {column:"phone_custom_field_20",type:"String"},
    {column:"phone_error",type:"Boolean"},
    {column:"phone_error_type",type:"Options"},
    //Email Fields
    {column:"email_address",type:"String"},
    {column:"email_validity",type:"String"},
    {column:"email_skip_source",type:"String"},
    {column:"email_skip_date",type:"Date"},
    {column:"email_pull_date",type:"Date"},
    {column:"email_last_marketed_date",type:"Date"},
    {column:"email_last_exported_date",type:"Date"},
    {column:"email_custom_field_1",type:"String"},
    {column:"email_custom_field_2",type:"String"},
    {column:"email_custom_field_3",type:"String"},
    {column:"email_custom_field_4",type:"String"},
    {column:"email_custom_field_5",type:"String"},
    {column:"email_error",type:"Boolean"},
    {column:"email_error_type",type:"Options"},
    // Golden Address
    {column:"golden_address_address",type:"String"},
    {column:"golden_address_city",type:"String"},
    {column:"golden_address_state",type:"String"},
    {column:"golden_address_zip",type:"String"},
    {column:"golden_address_full_address",type:"String"},
    {column:"golden_address_address_line2",type:"String"},
    {column:"golden_skip_source",type:"String"},
    {column:"golden_address_pull_date",type:"String"},
    {column:"golden_address_last_marketed_date",type:"String"},
    {column:"golden_address_last_exported_date",type:"String"},
    {column:"golden_address_custom_field_1",type:"String"},
    {column:"golden_address_custom_field_2",type:"String"},
    {column:"golden_address_custom_field_3",type:"String"},
    {column:"golden_address_custom_field_4",type:"String"},
    {column:"golden_address_custom_field_5",type:"String"},
    {column:"golden_address_custom_field_6",type:"String"},
    {column:"golden_address_custom_field_7",type:"String"},
    {column:"golden_address_custom_field_8",type:"String"},
    {column:"golden_address_custom_field_9",type:"String"},
    {column:"golden_address_custom_field_10",type:"String"},
    {column:"golden_address_custom_field_11",type:"String"},
    {column:"golden_address_custom_field_12",type:"String"},
    {column:"golden_address_custom_field_13",type:"String"},
    {column:"golden_address_custom_field_14",type:"String"},
    {column:"golden_address_custom_field_15",type:"String"},
    {column:"golden_address_custom_field_16",type:"String"},
    {column:"golden_address_custom_field_17",type:"String"},
    {column:"golden_address_custom_field_18",type:"String"},
    {column:"golden_address_custom_field_19",type:"String"},
    {column:"golden_address_custom_field_20",type:"String"},
    // List Fields
    {column:"list_market",type:"String"},
    {column:"list_type",type:"String"},
    {column:"list_group",type:"String"},
    {column:"list_code",type:"String"},
    {column:"list_source",type:"String"},
    {column:"list_skip_source",type:"String"},
    {column:"list_skip_date",type:"String"},
    {column:"list_run_month",type:"String"},
    {column:"list_run_year",type:"String"},
    {column:"list_stack",type:"String"},
    {column:"list_hash",type:"String"},
    {column:"mapped_fields",type:"String"},
    {column:"skip_validate",type:"String"},
    {column:"file_fields",type:"String"},
    {column:"skip_data",type:"String"},
    {column:"prev_pull_date",type:"Date"},
    {column:"list_pull_date",type:"Date"},
    {column:"list_data_date",type:"Date"},
    {column:"overridden_run_month",type:"String"},
    {column:"overridden_run_year",type:"String"},
    {column:"list_last_marketed_date",type:"Date"},
    {column:"list_last_exported_date",type:"Date"},
    {column:"list_custom_field_1",type:"String"},
    {column:"list_custom_field_2",type:"String"},
    {column:"list_custom_field_3",type:"String"},
    {column:"list_custom_field_4",type:"String"},
    {column:"list_custom_field_5",type:"String"},
    {column:"total_subjects",type:"String"},
    {column:"total_sellers",type:"String"},
    {column:"total_phones",type:"String"},
    {column:"total_emails",type:"String"},
    {column:"total_golden_addresses",type:"String"}
    ],
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
    additionalFilterFieldsTypes: ({ additionalFilterFieldsTypes }) => additionalFilterFieldsTypes,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
