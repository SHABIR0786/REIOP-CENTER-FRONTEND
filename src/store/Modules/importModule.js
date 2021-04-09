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
        'seller_mailing_address',
        'seller_mailing_city',
        'seller_mailing_state',
        'seller_mailing_zip',
        'seller_company_owned',
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
        'liststack'
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
    uploadedFields: []
}

export const mutations = {
    SET_UPLOADED_FIELDS(state, payload) {
        state.uploadedFields = payload
    }
}

export const actions = {
    setUploadedFields ({ commit }, data) {
        commit('SET_UPLOADED_FIELDS', data)
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