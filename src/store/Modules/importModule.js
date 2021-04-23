import * as api from "../Services/api.js";

export const state = {
    emailFields: [
        'seller_id', 'email_address', 'email_validify', 'skip_source'
    ],
    goldenAddressFields: [
        'seller_id', 'golden_address', 'golden_city', 'golden_state', 'golden_zip'
    ],
    listFields: [
        'dept', 'list_type', 'group', 'code', 'source', 'stack'
    ],
    phoneNumberFields: [
        'seller_id', 'phone_number', 'phone_type', 'phone_validity', 'skip_source'
    ],
    sellerFields: [
        'full_name',
        'first_name',
        'last_name',
        'middle_name',
        'mailing_address',
        'mailing_city',
        'mailing_state',
        'mailing_zip',
        'company_owned',
        'total_subject'
    ],
    subjectFields: [
        'subject_address',
        'subject_city',
        'subject_state',
        'subject_zip',
        'subject_county',
        'market',
        'sub_market',
        'subject_age',
        'subject_type',
        'total_seller',
        'list_stack'
    ],
    mappedHeader: [
        {
            key: 'fromField',
            label: 'From',
            sortable: true
        },
        {
            key: 'toField',
            label: 'To',
            sortable: true
        },
        {
            key: 'action',
            label: 'Remove',
            sourtable: false
        }
    ],
    uploadedFields: [],
    uploaded: false
}

export const mutations = {
    SET_UPLOADED_FIELDS(state, payload) {
        state.uploadedFields = payload
    },
    SET_UPLOADED(state, payload){
        state.uploaded = payload
    }
}

export const actions = {
    setUploadedFields ({ commit }, data) {
        commit('SET_UPLOADED_FIELDS', data)
    },
    async uploadExcelData({ commit }, {data, url}) {
        return await api.post(`/${url}/`, data)
        .then((response) => {
            commit('SET_UPLOADED', true)
            return response
        })
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}