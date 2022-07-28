
import * as api from "../Services/api";
const state = {
    fields: [
        {key:"id",  label: "Id", sortable: true},
        {key:"export_type",  label: "Export Type", sortable: true},
        {key:"actions",  label: "Actions", sortable: false},
        {key:"exported_subjects",  label: "Exported Subjects", sortable: true},
        {key:"exported_sellers",  label: "Exported Sellers", sortable: true},
        {key:"exported_phones",  label: "Exported Phones", sortable: true},
        {key:"exported_emails",  label: "Exported Emails", sortable: true},
        {key:"exported_golden_addresses",  label: "Exported Golden Addresses", sortable: true},
        {key:"user",  label: "User", sortable: true},
        {key:"created_at",  label: "Exported Date", sortable: true},
        ],
    items: [],
    totalItems: 0,
    selectedItem: {},
}

const mutations = {
    EXPORTS_ITEMS(state, payload) {
        const data = payload.data;
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        })
        state.items = data;

        state.totalItems = payload.total;
    },
    SET_EXPORT(state, payload) {
        state.selectedItem = payload;
    }
};

const actions = {
    async exports({commit, dispatch}, {page, perPage, sortBy, sortDesc}) {
    return await api.get(`/exports?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if (response && response.exports) {
                commit('EXPORTS_ITEMS', response.exports)
            }
            return response;
        })
    },
    async getSelectedExport({commit}, data) {        
        return await api.get(`/exports/selected/${data}`).then((response) => {
            if (response ) {
                commit('SET_EXPORT', response.export)
            }
            return response
        })
    },
 };

const getters = {
    fields: ({ fields }) => fields,
    items: ({ items }) => items,
    totalItems: ({ totalItems }) => totalItems,
    selectedItem: ({ selectedItem }) => selectedItem
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
