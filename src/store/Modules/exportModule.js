
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
    exports: [],
    totalexports: 0,
    totalItems: 0,
    selectedItem: {},
    exportTypes: [
    "",
    "To Market",
    "To SkipTrace",
    "Miscellaneous Reason" ]
}

const mutations = {
    EXPORTS_ITEMS(state, payload) {
        const data = payload.data;
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.export_type = state.exportTypes[e.export_type];
        })
        state.items = data;
        state.totalItems = payload.total;
    },
    EXPORTS(state, payload) {
        const data = payload;
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.user = e?.user?.name;
            e.export_type = state.exportTypes[e.export_type];
        })
        state.exports = data;
        state.totalexports = payload.total;
        console.log(data);
    },
    SET_EXPORT(state, payload) {
        state.selectedItem = payload;
    },
    DELETE_EXPORT(state, payload) {
        const EXPORTS = state.items;
        const findIndex = EXPORTS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && EXPORTS.splice(findIndex, 1)
        state.items = EXPORTS;
    },
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
    async deleteExport({commit}, data) {
        return await api.deleteAPI(`/exports/${data}`).then((response) => {
            commit('DELETE_EXPORT', data)
            return response
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
    async getExports({commit}, {module, id}) {
        return await api.get(`/${module}/exports/${id}`).then((response) => {
            if(response) {
                commit('EXPORTS', response.exports);
            }
        });
    }
 };

const getters = {
    fields: ({ fields }) => fields,
    items: ({ items }) => items,
    totalItems: ({ totalItems }) => totalItems,
    selectedItem: ({ selectedItem }) => selectedItem,
    totalexports: ({totalexports}) => totalexports,
    exports: ({exports}) => exports,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
