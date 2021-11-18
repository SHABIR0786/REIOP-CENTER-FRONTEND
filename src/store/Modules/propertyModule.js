import * as api from "../Services/api"
const defaultFields = [
    //Subject
    {key:"id", label: "Id", sortable: true},
    {key: "actions", label: "Actions"},
    {key: "total_sellers", label: "Total Sellers"},
    {key: "list_stack", label: "List Stack"},

    {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true, visible: false},
    // {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
    {key: "subject_city", label: "Subject City", sortable: true, visible: false},
    {key: "subject_state", label: "Subject State", sortable: true, visible: false},
    {key: "subject_zip", label: "Subject Zip", sortable: true},
    {key: "subject_country", label: "Subject County", sortable: true},
    // {key: "subject_market", label: "Market", sortable: true},
    {key: "subject_type", label: "Subject Type", sortable: true},
    {key: "subject_age", label: "Subject Age", sortable: true},
]
const state = {
    fields: [
        ...defaultFields
    ],
    subjects: [],
    total: 0,
    allFields: [
        //Subject
        {key:"id", label: "Id", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "total_sellers", label: "Total Sellers"},
        {key: "list_stack", label: "List Stack"},

        {key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true, visible: false},
        // {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
        {key: "subject_city", label: "Subject City", sortable: true, visible: false},
        {key: "subject_state", label: "Subject State", sortable: true, visible: false},
        {key: "subject_zip", label: "Subject Zip", sortable: true},
        {key: "subject_country", label: "Subject County", sortable: true},
        // {key: "subject_market", label: "Market", sortable: true},
        {key: "subject_type", label: "Subject Type", sortable: true},
        {key: "subject_age", label: "Subject Age", sortable: true},


        // Custom Fields
        // {key: "subject_last_marked_date", label: "Last Marketed Date", sortable: true},
        // {key: "subject_last_exported_date", label: "Last Exported Date", sortable: true},
        // {key: "subject_pull_date", label: "Pull Date", sortable: true},
        // {key: "subject_skip_trace_date", label: "Skip Trace Date", sortable: true},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_id", label: "Uploaded By", sortable: true},

        //List
        {key:"list_market", label: "Markets", sortable: true, visible: false},
        {key:"list_group", label: "Group", sortable: true},
        {key:"list_type", label: "Type", sortable: true},
        {key:"list_source", label: "Source", sortable: true},

        //Seller
        {key: "seller_first_name", label: "First Name", sortable: true},
        {key: "seller_last_name", stickyColumn: true, label: "Last Name", sortable: true},
        {key: "seller_mailing_address", label: "Mailing Address"},
        {key: "seller_mailing_state", label: "Mailing State"},
        {key: "seller_mailing_city", label: "Mailing City"},
        {key: "seller_mailing_zip", label: "Mailing Zip"},
    ],
}

const mutations = {
    SET_ALL_SUBJECTS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            if(e.lists) {
                let list_market = [];
                let list_group = [];
                let list_type = [];
                let list_source = [];

                e.lists.forEach(list => {
                    if(list.list_market) list_market.push(list.list_market);
                    if(list.list_group) list_group.push(list.list_group);
                    if(list.list_type) list_type.push(list.list_type);
                    if(list.list_source) list_source.push(list.list_source);
                });

                e.list_market = list_market.join(', ');
                e.list_group = list_group.join(', ');
                e.list_type = list_type.join(', ');
                e.list_source = list_source.join(', ');
            }

            if(e.sellers) {
                let seller_first_name = [];
                let seller_last_name = [];
                let seller_mailing_address = [];
                let seller_mailing_state = [];
                let seller_mailing_city = [];
                let seller_mailing_zip = [];
                 e.sellers.forEach(seller => {
                     if(seller.seller_first_name) seller_first_name.push(seller.seller_first_name);
                     if(seller.seller_last_name) seller_last_name.push(seller.seller_last_name);
                     if(seller.seller_mailing_address) seller_mailing_address.push(seller.seller_mailing_address);
                     if(seller.seller_mailing_state) seller_mailing_state.push(seller.seller_mailing_state);
                     if(seller.seller_mailing_city) seller_mailing_city.push(seller.seller_mailing_city);
                     if(seller.seller_mailing_zip) seller_mailing_zip.push(seller.seller_mailing_zip);
                 });

                 e.seller_first_name = seller_first_name.join(', ');
                 e.seller_last_name = seller_last_name.join(', ');
                 e.seller_mailing_address = seller_mailing_address.join(', ');
                 e.seller_mailing_state = seller_mailing_state.join(', ');
                 e.seller_mailing_city = seller_mailing_city.join(', ');
                 e.seller_mailing_zip = seller_mailing_zip.join(', ');
            }
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.subjects = [...data]
    },
    EDIT_SUBJECT(state, payload) {
        const findIndex = state.subjects.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.subjects.splice(findIndex, 1, { ...payload })
    },
    DELETE_SUBJECT(state, payload) {
        const findIndex = state.subjects.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.subjects.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_SUBJECT(state, payload) {
        const findIndex = state.subjects.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.subjects.splice(findIndex, 1, { ...payload })
    },
    GET_TEMPLATE(state, payload) {
        if(payload !== null) {
            let parseData = JSON.parse(payload.configuration);
            state.fields = [
                {key:"id", label: "Id", sortable: true},
                {key: "actions", label: "Actions"},
            ];
            for(let key in parseData) {
                if(key !== 'name' && parseData[key] !== false) {
                    let obj = state.allFields.find(o => o['key'] === key);
                    state.fields.push(obj);
                }
            }
        } else {
            state.fields = [...defaultFields]
        }
    }
}

const actions = {
    async getAllSubjects({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/subjects?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', response.subjects.data)
            }

            return response
        })
    },
    async getAllSubjectsV2({ commit, dispatch }, {page, perPage, filter}) {
        let params = '?page=' + page + '&perPage=' + perPage;
        if (filter) {
            const keys = Object.keys(filter);
            keys.forEach(key => {
                params = params + '&' + key + '=' + filter[key];
            })
        }

        return await api.get(`/subjectsV2${params}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', response.subjects.data)
                commit('GET_TOTAL', response.subjects.total)
            }

            return response
        })
    },
    async searchSubjects({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/subjects?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', response.subjects.data)
            }

            return response
        })
    },
    async editSubject({ commit }, data) {
        return await api.put(`/subjects/${data.id}`, {...data}).then((response) => {
            commit('EDIT_SUBJECT', data)
            return response
        })
    },
    async addSubject({ commit }, data) {
        return await api.post(`/subjects`, {...data}).then((response) => {
            commit('ADD_SUBJECT', data)
            return response
        })
    },
    async deleteSubject({ commit }, data) {
        return await api.deleteAPI(`/subjects/${data}`).then((response) => {
            commit('DELETE_SUBJECT', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/subjects`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    // eslint-disable-next-line no-empty-pattern
    async exportProperties({}, data) {
        let params = '?type=' + data.fileType;
        if (data.templateId) {  params = params + '&template_id=' + data.templateId; }
        if (data && data.filter) {
                const keys = Object.keys(data.filter);
                keys.forEach(key => {
                    params = params + '&' + key + '=' + data.filter[key];
                })
        }
        return await api.get(`/properties/export${params}`).then(() => {console.log('success')});
    },
    async getTemplate({ commit }, data) {
        if(data.id !== null) {
            return await api.get(`/templates/${data.id}`).then((response) => {
                commit('GET_TEMPLATE', response.template)
                return response
            })
        } else {
            commit('GET_TEMPLATE', null);
        }
    }
}

const getters = {
    fields: ({ fields }) => fields,
    subjects: ({ subjects }) => subjects,
    total: ({total}) => total
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
