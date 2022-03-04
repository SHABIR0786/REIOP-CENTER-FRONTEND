import * as api from "../Services/api"

const state = {
    subject_fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "error_type", label: "Error"},
        {key: "file_name", label: "File Name"},
        {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true},
        {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
        {key: "subject_city", label: "Subject City", sortable: true},
        {key: "subject_state", label: "Subject State", sortable: true},
        {key: "subject_zip", label: "Subject Zip", sortable: true},
        {key: "subject_country", label: "Subject County", sortable: true},
        {key: "subject_market", label: "Market", sortable: true},
        {key: "subject_type", label: "Subject Type", sortable: true},
        {key: "subject_age", label: "Subject Age", sortable: true},


        // Custom Fields
        {key: "subject_last_marked_date", label: "Last Marketed Date", sortable: true},
        {key: "subject_last_exported_date", label: "Last Exported Date", sortable: true},
        {key: "subject_pull_date", label: "Pull Date", sortable: true},
        {key: "subject_skip_trace_date", label: "Skip Trace Date", sortable: true},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},

    ],
    phone_fields: [
        {key:"id", label: "ID", sortable: true},
        {key: "error_type", label: "Error"},
        {key: "file_name", label: "File Name"},
        {key: "seller_id", label: "Seller ID", sortable: true},
        {key: "phone_number", label: "Phone Number", sortable: true},
        {key: "phone_type", label: "Phone Type", sortable: true},
        {key: "phone_validity", label: "Phone Validity", sortable: true},
        {key: "phone_skip_source", label: "Phone Skip Source"},

        // Custom Fields

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    email_fields: [
        {key:"id", label: "ID", sortable: true},
        {key: "error_type", label: "Error"},
        {key: "file_name", label: "File Name"},
        {key: "seller_id",label: "Seller ID", sortable: true},
        {key: "email_address", label: "Email Address", sortable: true},
        {key: "email_validity", label: "Email Validity", sortable: true},
        {key: "email_skip_source", label: "Skip Source", sortable: true},

        // Custom Fields

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    seller_fields: [
        {key: "id", label: "ID", sortable: true},
        {key: "error_type", label: "Error Type", sortable: true},
        {key: "file_name", label: "File Name"},
        // {key: "seller_total_subjects", label: "Total Subjects", sortable: true},
        // {key: "seller_total_phones", label: "Total Phones", sortable: true},
        // {key: "seller_total_emails", label: "Total Emails", sortable: true},
        {key: "seller_first_name", label: "First Name", sortable: true},
        {key: "seller_middle_name", label: "Middle Name", sortable: true},
        {key: "seller_last_name", stickyColumn: true, label: "Last Name", sortable: true},
        {key: "seller_mailing_address", label: "Mailing Address"},
        {key: "seller_mailing_address_line2", label: "Mailing Address Line2"},
        {key: "seller_mailing_state", label: "Mailing State"},
        {key: "seller_mailing_city", label: "Mailing City"},
        {key: "seller_mailing_zip", label: "Mailing Zip"},
        // {key: "seller_company_owned", label: "Company Owned"},


        // Custom Fields
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},

    ],
    golden_fields: [
        {key: "id", label: "ID", sortable: true},
        {key: "error_type", label: "Error Type", sortable: true},
        {key: "file_name", label: "File Name"},
        {key: "seller_id", label: "Seller ID", sortable: true},
        {key: "golden_address_address", label: "Golden Address", sortable: true},
        {key: "golden_address_city",  label: "Golden City", sortable: true},
        {key: "golden_address_state", label: "Golden State"},
        {key: "golden_address_zip", label: "Golden Zip"},
        {key: "golden_address_address_line2", label: "Golden Address Line2"},

        // Custom Fields
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},

    ],
    subjects: [],
    emails: [],
    phones: [],
    sellers: [],
    goldens:[],
    subjectTotal:0,
    emailTotal:0,
    phoneTotal:0,
    sellerTotal:0,
    goldenTotal:0,
}

const mutations = {
    SET_ALL_SUBJECTS(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.subjects = [...data]
        state.subjectTotal = payload.total
    },
    SET_ALL_EMAILS(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.emails = [...data]
        state.emailTotal = payload.total
    },
    SET_ALL_PHONES(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.phones = [...data]
        state.phoneTotal = payload.total
    },

    SET_ALL_SELLERS(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.sellers = [...data]
        state.sellerTotal = payload.total
    },
    SET_ALL_GOLDENS(state, payload) {
        const data = [...payload.data]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.goldens = [...data]
        state.goldenTotal = payload.total
    },

}

const actions = {
    async getAllErrors({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/errors?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.subjects) {
                commit('SET_ALL_SUBJECTS', response.subjects)
            }

            if(response && response.emails) {
                commit('SET_ALL_EMAILS', response.emails)
            }

            if(response && response.phones) {
                commit('SET_ALL_PHONES', response.phones)
            }

            if(response && response.sellers) {
                commit('SET_ALL_SELLERS', response.sellers)
            }
            if(response && response.goldens) {
                commit('SET_ALL_GOLDENS', response.goldens)
            }
            return response
        })
    },
}

const getters = {
    subject_fields: ({ subject_fields }) => subject_fields,
    phone_fields: ({ phone_fields }) => phone_fields,
    email_fields: ({ email_fields }) => email_fields,
    seller_fields: ({ seller_fields }) => seller_fields,
    golden_fields: ({ golden_fields }) => golden_fields,
    subjects: ({ subjects }) => subjects,
    emails: ({ emails }) => emails,
    phones: ({ phones }) => phones,
    sellers: ({ sellers }) => sellers,
    goldens:({ goldens }) => goldens,
    subjectTotal: ({subjectTotal}) => subjectTotal,
    emailTotal: ({emailTotal}) => emailTotal,
    phoneTotal: ({phoneTotal}) => phoneTotal,
    sellerTotal: ({sellerTotal}) => sellerTotal,
    goldenTotal: ({goldenTotal}) => goldenTotal,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
