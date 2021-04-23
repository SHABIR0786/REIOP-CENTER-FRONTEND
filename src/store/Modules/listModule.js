import * as api from "../Services/api"

const state = {
    listHeaders: [
        {
            key:"dept",
            label: "Dept",
            sortable: true

        },
        {
            key:"list_type",
            label: "List Type",
            sortable: true

        },
        {
            key:"group",
            label: "Group",
            sortable: true

        },
        {
            key:"code",
            label: "Code",
            sortable: true

        },
        {
            key:"source",
            label: "Source",
            sortable: true

        },
        {
            key:"stack",
            label: "Stack",
            sortable: true

        },
        {
            key: "actions",
            label: "Actions"
        }
    ],
    lists: []
}

const mutations = {
    SET_ALL_LISTS(state, payload) {
        state.lists = [...payload]
    },
    EDIT_LIST(state, payload) {
        const findIndex = state.lists.findIndex(({ id }) => id === payload.id)
        findIndex && state.lists.splice(findIndex, 1, { ...payload })
    },
    DELETE_LIST(state, payload) {
        const findIndex = state.lists.findIndex(({ id }) => id === payload)
        findIndex && state.lists.splice(findIndex, 1)
    }
}

const actions = {
    async getAllLists({ commit }) {
        return await api.get('/list')
        .then((response) => {
            commit('SET_ALL_LISTS', response)
            return response
        })
    },
    async editList({ commit }, data) {
        return await api.put('/list/', {...data})
        .then((response) => {
            commit('EDIT_LIST', data)
            return response
        })
    },
    async deleteList({ commit }, data) {
        return await api.deleteAPI(`/list/${data}`)
        .then((response) => {
            commit('DELETE_LIST', data)
            return response
        })
    }
}

const getters = {
    listHeaders: ({ listHeaders }) => listHeaders,
    lists: ({ lists }) => lists
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}