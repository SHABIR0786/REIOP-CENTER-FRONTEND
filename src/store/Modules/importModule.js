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
    VUEX_STORE(state) {
        state.emailFields = [];
        state.goldenAddressFields = 0;
        state.listFields = {};
        state.phoneNumberFields = {};
        state.sellerFields = {};
        state.subjectFields = {};
        state.uploadedFields = {};
        state.importVisibleFields = {};
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

    async uploadExcelDataV2({ commit }, {file, mappedItems, url, list, skipSource, mapOrder,skipData,skipValidate}) {
        const config = {headers: {'content-type': 'multipart/form-data; charset=UTF-8'}}

        let data = new FormData();
        data.append('file', file);
        data.append('section', url);
        data.append('list', JSON.stringify(list));
        data.append('skipData', JSON.stringify(skipData));
        data.append('skipSource', skipSource);
        data.append('skipValidate', skipValidate);

        const mapObject = {};
        mappedItems.forEach(map => {
            mapObject[map.fromField] = map.toField;
        })
        const mapSequence  = {};
        mapOrder.forEach(map => {
            mapSequence[map.fromField] = map.toField;
        })
        data.append('mapOrder', JSON.stringify(mapSequence));
        data.append('map', JSON.stringify(mapObject));
        return await api.post('/upload', data, config).then((response) => {
            commit('SET_UPLOADED', true)
            return response
        })
    },
    async loadVisibleFields ({ commit }) {
        return await api.get('/visible-labels').then((response) => {
            if (response && response.labels) {
                commit('SET_IMPORT_FIELDS', response.labels);
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
    uploadedFields: ({ uploadedFields }) => uploadedFields,
    mappedHeader: ({ mappedHeader }) => mappedHeader,
    schemas: ({ schemas }) => schemas,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
