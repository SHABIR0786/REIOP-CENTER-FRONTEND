import * as api from "../Services/api"

const state = {
    fields: [
        {key:"delete", label: ""},
        {key:"id", label: "ID", sortable: true},
        {key: "actions", label: "Actions"},

        {key: "seller_total_subjects", label: "Total Subjects", sortable: true},
        {key: "seller_total_phones", label: "Total Phones", sortable: true},
        {key: "seller_total_emails", label: "Total Emails", sortable: true},


        {key: "seller_first_name", label: "First Name", sortable: true},
        {key: "seller_middle_name", label: "Middle Name", sortable: true},
        {key: "seller_last_name", stickyColumn: true, label: "Last Name", sortable: true},

        {key: "seller_mailing_address", label: "Mailing Address"},
        {key: "seller_mailing_address_line2", label: "Mailing Address Line2"},
        {key: "seller_mailing_state", label: "Mailing State"},
        {key: "seller_mailing_city", label: "Mailing City"},
        {key: "seller_mailing_zip", label: "Mailing Zip"},
        {key: "seller_company_owned", label: "Company Owned"},

        // Errors
        {key: "error", label: "Error", sortable: true},
        {key: "error_type", label: "Error Type", sortable: true},

        // Custom Fields
        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
        {key:"user_name", label: "Uploaded By", sortable: true},

    ],
    sellers: [],
    total: 0,
    seller: {}
}

const mutations = {
    SET_ALL_SELLERS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.seller_total_phones = e.phones.length;
            e.seller_total_emails = e.emails.length;
            e.seller_total_subjects = e.subjects.length;
        })
        state.sellers = JSON.stringify(data);
    },
    EDIT_SELLER(state, payload) {
        const SELLER = JSON.parse(state.sellers)
        const findIndex = SELLER.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SELLER.splice(findIndex, 1, { ...payload })
    },
    DELETE_SELLER(state, payload) {
        const SELLER = JSON.parse(state.sellers)
        const findIndex = SELLER.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SELLER.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_SELLER(state, payload) {
        const SELLER = JSON.parse(state.sellers)
        const findIndex = SELLER.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SELLER.splice(findIndex, 1, { ...payload })
    },
    SET_SELLER(state, payload) {
        state.seller = JSON.stringify(payload);
    },
    DELETE_MULTIPLE_SELLERS(state, payload) {
        const SELLER = JSON.parse(state.sellers)
        const findIndex = SELLER.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SELLER.splice(findIndex, 1)
    },
    VUEX_STORE(state) {
        state.sellers = [];
        state.total = 0;
        state.seller = {};
    },
}

const actions = {
    async getAllSellers({ commit }, {page, perPage}) {
        return await api.get(`/sellers?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.sellers && response.sellers.data) {
                commit('SET_ALL_SELLERS', response.sellers.data)
            }

            return response
        })
    },
    async getSeller({commit}, data) {
        return await api.get(`/sellers/full/${data}`).then((response) => {
            if (response && response.seller) {
                commit('SET_SELLER', response.seller)
            }

            return response
        })
    },
    async searchSellers({ commit }, {page, perPage, search}) {
        return await api.get(`/sellers?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.sellers && response.sellers.data) {
                commit('SET_ALL_SELLERS', response.sellers.data)
            }

            return response
        })
    },
    async editSeller({ commit }, data) {
        const updatedData = Object.assign({}, data);
        delete updatedData.subjects;
        delete updatedData.emails;
        delete updatedData.phones;
        delete updatedData.golden_addresses;
        delete updatedData.subject_id;
        delete updatedData.seller_total_emails;
        delete updatedData.seller_total_phones;
        delete updatedData.seller_total_subjects;
        delete updatedData.user_name;

        return await api.put(`/sellers/${data.id}`, updatedData).then((response) => {
            commit('EDIT_SELLER', data)
            return response
        })
    },
    async addSeller({ commit }, data) {
        return await api.post(`/sellers`, {...data}).then((response) => {
            commit('ADD_SELLER', data)
            return response
        })
    },
    async deleteSeller({ commit }, data) {
        return await api.deleteAPI(`/sellers/${data}`).then((response) => {
            commit('DELETE_SELLER', data)
            return response
        })
    },
    async deleteMultipleSellers({ commit }, data) {
        return await api.deleteAPI(`/sellers/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_SELLERS', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/sellers`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    },
    // eslint-disable-next-line no-empty-pattern
    async attachment({}, {subject_id, seller_id}) {
        return await api.post(`/attach`, {subject_id, seller_id}).then((response) => {
           console.log('attached', response);
        })
    },
    async deleteVuexStore({ commit }) {
        commit ('VUEX_STORE');
    },
}

const getters = {
    fields: ({ fields }) => fields,
    sellers: ({ sellers }) => {
        if (typeof sellers === 'string') {
            return JSON.parse(sellers);
        }
        return [];
    },
    total: ({total}) => total,
    seller: ({seller}) => seller
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
