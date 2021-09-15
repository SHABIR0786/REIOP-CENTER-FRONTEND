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
                   state.subjectFields.push(item.field); // label
                   break;
               case  'seller':
                   state.sellerFields.push(item.field);
                   break;
               case 'phone':
                   state.phoneNumberFields.push(item.field);
                   break;
               case 'email':
                   state.emailFields.push(item.field);
                   break;
               case 'golden_address':
                   state.goldenAddressFields.push(item.field);
                   break;
               case 'list':
                   state.listFields.push(item.field);
                   break;
           }
        });
    }
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

    async uploadExcelDataV2({ commit }, {file, mappedItems, url}) {
        const config = {headers: {'content-type': 'multipart/form-data'}}

        let data = new FormData();
        data.append('file', file);
        data.append('section', url);

        const mapObject = {};
        mappedItems.forEach(map => {
            mapObject[map.fromField] = map.toField;
        })

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
    }
}

export const getters = {
    emailFields: ({ emailFields }) => emailFields,
    goldenAddressFields: ({ goldenAddressFields }) => goldenAddressFields,
    listFields: ({ listFields }) => listFields,
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
