import * as api from "../Services/api"
import axios from "axios";

const defaultFields = [
    //Subject
    {key:"delete", label: ""},
    {key:"id", label: "Id", sortable: true},
    {key: "actions", label: "Actions"},
    {key: "total_sellers", label: "Total Sellers", sortable: false},
    {key: "list_stack", label: "List Stack", sortable: false},

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
    sameRowSubjects: [],
    seperatedRowSubjects: [],
    total: 0,
    maxSellers: 0,
    maxPhones: 0,
    maxEmails: 0,
    maxGoldenAddresses: 0,
    allFields: [
        //Subject
        {key:"id", label: "Id", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "total_sellers", label: "Total Sellers", sortable: true},
        {key: "list_stack", label: "List Stack", sortable: true},

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


    ],
}

const mutations = {
    SET_ALL_SUBJECTS(state, payload) {
        const data = [...payload.data];
        state.maxSellers = 0;
        state.maxPhones = 0;
        state.maxEmails = 0;
        state.maxGoldenAddresses = 0;
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
                  e.sellers.forEach((seller,index) => {
                    let sellerCount = index + 1;
                    e[sellerCount+'_seller_full_name'] = seller.seller_full_name;
                    e[sellerCount+'_seller_first_name'] = seller.seller_first_name;
                    e[sellerCount+'_seller_last_name'] = seller.seller_last_name;
                    e[sellerCount+'_seller_middle_name'] = seller.seller_middle_name;
                    e[sellerCount+'_seller_mailing_address'] = seller.seller_mailing_address;
                    e[sellerCount+'_seller_mailing_state'] = seller.seller_mailing_state;
                    e[sellerCount+'_seller_mailing_city'] = seller.seller_mailing_city;
                    e[sellerCount+'_seller_mailing_zip'] = seller.seller_mailing_zip;

                    // Seller Phones
                    seller.phones.forEach((phone,phoneIndex) => {
                    let phoneCount = phoneIndex + 1;
                    e['seller_'+sellerCount+'_phone_'+phoneCount+'_phone_number'] = phone.phone_number;
                    e['seller_'+sellerCount+'_phone_'+phoneCount+'_phone_type'] = phone.phone_type;
                    e['seller_'+sellerCount+'_phone_'+phoneCount+'_phone_validity'] = phone.phone_validity;
                    e['seller_'+sellerCount+'_phone_'+phoneCount+'_phone_skip_source'] = phone.phone_skip_source;                    
                    });

                    // Seller Emails
                    seller.emails.forEach((email,emailIndex) => {
                        let emailCount = emailIndex + 1;
                        e['seller_'+sellerCount+'_email_'+emailCount+'_email_address'] = email.email_address;
                        e['seller_'+sellerCount+'_email_'+emailCount+'_email_validity'] = email.email_validity;
                        e['seller_'+sellerCount+'_email_'+emailCount+'_email_skip_source'] = email.email_skip_source;
                    });

                    // Seller Golden Addresses
                    seller.golden_addresses.forEach((golden,goldenIndex) => {
                        let goldenCount = goldenIndex + 1;
                        e['seller_'+sellerCount+'_golden_'+goldenCount+'_golden_address_address'] = golden.golden_address_address;
                        e['seller_'+sellerCount+'_golden_'+goldenCount+'_golden_address_city'] = golden.golden_address_city;
                        e['seller_'+sellerCount+'_golden_'+goldenCount+'_golden_address_state'] = golden.golden_address_state;
                        e['seller_'+sellerCount+'_golden_'+goldenCount+'_golden_address_zip'] = golden.golden_address_zip;

                    });

                // get Max counts for Phones, Emails and Golden addresses
                    if(seller.phones.length > state.maxPhones) {
                        state.maxPhones = seller.phones.length;
                    }

                    if(seller.emails.length > state.maxEmails) {
                        state.maxEmails = seller.emails.length;
                    }

                    if(seller.golden_addresses.length > state.maxGoldenAddresses) {
                        state.maxGoldenAddresses = seller.golden_addresses.length;
                    }
                });
            }
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.list_stack = e.lists.length;
            e.total_sellers = e.sellers.length;
            if(e.sellers.length > state.maxSellers) {
                state.maxSellers = e.sellers.length;
            }
            
        })
        state.sameRowSubjects = JSON.stringify(data);
        
        // Mapping date for seperate row subjects.
        const seperatedRowSubjects = [...payload.data];
        seperatedRowSubjects.forEach(e=> {
        if(e.sellers) {
            e.sellers.forEach((seller) => {
                let seperatedRowSubject = {...e};
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
    
                    seperatedRowSubject.list_market = list_market.join(', ');
                    seperatedRowSubject.list_group = list_group.join(', ');
                    seperatedRowSubject.list_type = list_type.join(', ');
                    seperatedRowSubject.list_source = list_source.join(', ');
                }
                seperatedRowSubject['seller_full_name'] = seller.seller_full_name;
                seperatedRowSubject['seller_first_name'] = seller.seller_first_name;
                seperatedRowSubject['seller_last_name'] = seller.seller_last_name;
                seperatedRowSubject['seller_middle_name'] = seller.seller_middle_name;
                seperatedRowSubject['seller_mailing_address'] = seller.seller_mailing_address;
                seperatedRowSubject['seller_mailing_state'] = seller.seller_mailing_state;
                seperatedRowSubject['seller_mailing_city'] = seller.seller_mailing_city;
                seperatedRowSubject['seller_mailing_zip'] = seller.seller_mailing_zip;

                // Seller Phones
                seller.phones.forEach((phone) => {
                    seperatedRowSubject['seller_phone_number'] = phone.phone_number;
                    seperatedRowSubject['seller_phone_type'] = phone.phone_type;
                    seperatedRowSubject['seller_phone_validity'] = phone.phone_validity;
                    seperatedRowSubject['seller_phone_skip_source'] = phone.phone_skip_source;                    
                    });
                // Seller Emails
                seller.emails.forEach((email) => {
                    seperatedRowSubject['seller_email_address'] = email.email_address;
                    seperatedRowSubject['seller_email_validity'] = email.email_validity;
                    seperatedRowSubject['seller_email_skip_source'] = email.email_skip_source;
                });
                // Seller Golden Addresses
                seller.golden_addresses.forEach((golden) => {
                    seperatedRowSubject['seller_golden_address_address'] = golden.golden_address_address;
                    seperatedRowSubject['seller_golden_address_city'] = golden.golden_address_city;
                    seperatedRowSubject['seller_golden_address_state'] = golden.golden_address_state;
                    seperatedRowSubject['seller_golden_address_zip'] = golden.golden_address_zip;
                });
                state.seperatedRowSubjects.push(seperatedRowSubject);
            })
        } else {
            let seperatedRowSubject = {...e};
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

                seperatedRowSubject.list_market = list_market.join(', ');
                seperatedRowSubject.list_group = list_group.join(', ');
                seperatedRowSubject.list_type = list_type.join(', ');
                seperatedRowSubject.list_source = list_source.join(', ');
            }
            state.seperatedRowSubjects.push(seperatedRowSubject);
        }
        });
        state.total = payload.total;
    },
    ADD_EXPORT(state, payload) {
        console.log(state, payload);
    },
    EDIT_SUBJECT(state, payload) {
        const SUBJECTS = JSON.parse(state.sameRowSubjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1, { ...payload })
        // Remove and add subjects to seperatedRowSubjects
        const SEPERATED_ROW_SUBJECTS = state.seperatedRowSubjects;
        let sepIndex = true;
        while(sepIndex) {
            const seperatedRowSubjectfindIndex = SEPERATED_ROW_SUBJECTS.findIndex(({ id }) => id === payload.id);
            seperatedRowSubjectfindIndex !== -1 && SEPERATED_ROW_SUBJECTS.splice(seperatedRowSubjectfindIndex, 1, { ...payload })
            if(seperatedRowSubjectfindIndex == -1) {
                sepIndex = false; 
            }
        }
    },
    DELETE_SUBJECT(state, payload) {
        const SUBJECTS = JSON.parse(state.sameRowSubjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1)

        // Remove and add subjects to seperatedRowSubjects
        const SEPERATED_ROW_SUBJECTS = state.seperatedRowSubjects;
        let sepIndex = true;
        while(sepIndex) {
            const seperatedRowSubjectfindIndex = SEPERATED_ROW_SUBJECTS.findIndex(({ id }) => id === payload.id);
            seperatedRowSubjectfindIndex !== -1 && SEPERATED_ROW_SUBJECTS.splice(seperatedRowSubjectfindIndex, 1)
            if(seperatedRowSubjectfindIndex == -1) {
                sepIndex = false; 
            }
        }
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    GET_TOTALS(state, payload) {
        state.totals = payload;
    },
    ADD_SUBJECT(state, payload) {
        const SUBJECTS = JSON.parse(state.sameRowSubjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1, { ...payload })
    },
    DELETE_MULTIPLE_SUBJECTS(state, payload) {
        const SUBJECTS = JSON.parse(state.sameRowSubjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1)
    },
    VUEX_STORE(state) {
        state.sameRowSubjects = [];
        state.total = 0;
        state.totals = {};
        state.maxSellers = 0;
        state.template = {};
        state.maxPhones = 0;
        state.maxEmails = 0;
        state.maxGoldenAddresses = 0;
    },

}

const actions = {
    async getAllSubjects({ commit, dispatch }, {page, perPage,search, sortBy, sortDesc}) {
        return await api.get(`/subjects?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', response.subjects)
            }

            return response
        })
    },
    async getAllSubjectsV2({ commit, dispatch }, data) {
        return await api.post(`/subjectsV2`,{...data}).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }
            
            if(response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', response.subjects)
                commit('GET_TOTAL', response.subjects.total)
            }

            return response
        })
    },
    async searchSubjects({ commit, dispatch }, {page, perPage, search,sortBy, sortDesc}) {
        return await api.get(`/subjects?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', response.subjects)
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
    async deleteMultipleSubjects({ commit }, data) {
        return await api.deleteAPI(`/subjects/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_SUBJECTS', data)
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
    async getTotals({ commit }, data) {
        return await api.post(`/properties/getTotals`,{...data}).then((response) => {
            if (response) {
                commit ('GET_TOTALS', response);
            }
            return response
        })
    },
    // eslint-disable-next-line no-empty-pattern
    async exportProperties({}, data) {
        let params = '?type=' + data.fileType;
        if (data.template) {  params = params + '&template_id=' + data.template; }
        if (data && data.filter) {
                const keys = Object.keys(data.filter);
                keys.forEach(key => {
                    params = params + '&' + key + '=' + data.filter[key];
                })
        }
        return await api.get(`/properties/export${params}`).then(() => {console.log('success')});
    },
    async storeExport({ commit }, data) {
        return await api.post(`/properties/export`, {...data}).then(async (response) => {
            commit ('ADD_EXPORT', response.count);
            if(response && response.id) {
                axios({
                    url: `${process.env.VUE_APP_API_URL}/properties/download/${response.id}`, // File URL Goes Here
                    method: 'GET',
                    responseType: 'blob',
                }).then((res) => {
                     const a = document.createElement('a');
                     document.body.appendChild(a);
                     const url = window.URL.createObjectURL(new Blob([res.data]));
                     a.href = url;
                     a.download = 'export.csv';
                     a.click();
                });
            }
            return response
        })
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

const getters = {
    fields: ({ fields }) => fields,
    sameRowSubjects: ({ sameRowSubjects }) => {
        if (typeof sameRowSubjects === 'string') {
            return JSON.parse(sameRowSubjects);
        }
        
        return [];
    },
    seperatedRowSubjects: ({ seperatedRowSubjects}) => seperatedRowSubjects,
    total: ({total}) => total,
    totals: ({totals}) => totals,
    maxSellers: ({maxSellers}) => maxSellers,
    maxPhones: ({maxPhones}) => maxPhones,
    maxEmails: ({maxEmails}) => maxEmails,
    maxGoldenAddresses: ({maxGoldenAddresses}) => maxGoldenAddresses,
    template: ({template}) => template
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
