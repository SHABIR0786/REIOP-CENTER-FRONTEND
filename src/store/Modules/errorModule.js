import * as api from "../Services/api"

const state = {
    subject_fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "error", label: "Error"},
        {key: "file_name", label: "File Name"},
        // {key: "actions", label: "Actions"},
        {key: "list_stack", label: "List Stack"},

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
        {key: "error", label: "Error"},
        {key: "file_name", label: "File Name"},
        {key: "seller_id", label: "Seller ID", sortable: true},
        // {key: "actions", stickyColumn: true, label: "Actions"},

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
        {key: "error", label: "Error"},
        {key: "file_name", label: "File Name"},
        {key: "seller_id",label: "Seller ID", sortable: true},
        // {key: "actions", stickyColumn: true, label: "Actions"},

        {key: "email_address", label: "Email Address", sortable: true},
        {key: "email_validity", label: "Email Validity", sortable: true},
        {key: "email_skip_source", label: "Skip Source", sortable: true},

        // Custom Fields

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},
    ],
    subjects: [],
    emails: [],
    phones: []
}

const mutations = {
    SET_ALL_SUBJECTS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.subjects = [...data]
    },
    SET_ALL_EMAILS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.emails = [...data]
    },
    SET_ALL_PHONES(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.phones = [...data]
    }
}

const actions = {
    async getAllErrors({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/errors?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.subjects) {
                const subjectErrors = response.subjects.map(item => {
                    if (item.data) { item["data"] = JSON.parse(item.data); }
                    if (item.full_data) { item["full_data"] = JSON.parse(item.full_data); }
                    if (item.full_header) { item["full_header"] = JSON.parse(item.full_header); }
                    if (item.full_map_header) { item["full_map_header"] = JSON.parse(item.full_map_header); }

                    const fullInfo = {};
                    if (item.full_data && item.full_header && item.full_data.length && item.full_header.length) {
                        for (let i = 0; i < item.full_header.length; i++) {
                            fullInfo[item.full_header[i]] = item.full_data[i];
                        }
                    }
                    return {...item, ...fullInfo, error: item.type};
                });

                commit('SET_ALL_SUBJECTS', subjectErrors)
            }

            if(response && response.emails) {
                const emailErrors = response.emails.map(item => {
                    if (item.data) { item["data"] = JSON.parse(item.data); }
                    if (item.full_data) { item["full_data"] = JSON.parse(item.full_data); }
                    if (item.full_header) { item["full_header"] = JSON.parse(item.full_header); }
                    if (item.full_map_header) { item["full_map_header"] = JSON.parse(item.full_map_header); }

                    const fullInfo = {};
                    if (item.full_data && item.full_header && item.full_data.length && item.full_header.length) {
                        for (let i = 0; i < item.full_header.length; i++) {
                            fullInfo[item.full_header[i]] = item.full_data[i];
                        }
                    }

                    return {...item, ...fullInfo, error: item.type};
                });

                commit('SET_ALL_EMAILS', emailErrors)
            }

            if(response && response.phones) {
                const phoneErrors = response.phones.map(item => {
                    if (item.data) { item["data"] = JSON.parse(item.data); }
                    if (item.full_data) { item["full_data"] = JSON.parse(item.full_data); }
                    if (item.full_header) { item["full_header"] = JSON.parse(item.full_header); }
                    if (item.full_map_header) { item["full_map_header"] = JSON.parse(item.full_map_header); }

                    const fullInfo = {};
                    if (item.full_data && item.full_header && item.full_data.length && item.full_header.length) {
                        for (let i = 0; i < item.full_header.length; i++) {
                            fullInfo[item.full_header[i]] = item.full_data[i];
                        }
                    }
                    return {...item, ...fullInfo, error: item.type};
                });

                commit('SET_ALL_PHONES', phoneErrors)
            }

            return response
        })
    }
}

const getters = {
    subject_fields: ({ subject_fields }) => subject_fields,
    phone_fields: ({ phone_fields }) => phone_fields,
    email_fields: ({ email_fields }) => email_fields,
    subjects: ({ subjects }) => subjects,
    emails: ({ emails }) => emails,
    phones: ({ phones }) => phones
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
