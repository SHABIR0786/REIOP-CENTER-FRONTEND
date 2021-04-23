import * as api from "../Services/api"

const state = {
    phoneHeaders: [
        {
            key: "seller",
            label: "Seller",
            sortable: true
        },
        {
            key: "phone_number",
            label: "Phone Number",
            sortable: true
        },
        {
            key: "phone_type",
            label: "Phone Type",
            sortable: true
        },
        {
            key: "phone_validity",
            label: "Validity",
            sortable: true
        },
        {
            key: "skip_source",
            label: "Skip Source"
        },
        {
            key: "actions",
            label: "Actions"
        }
    ],
    phoneNumbers: []
}

const mutations = {
    SET_ALL_ITEMS(state, payload) {
        state.phoneNumbers = [...payload]
    },
    EDIT_ITEM(state, payload) {
        const findIndex = state.phoneNumbers.findIndex(({ id }) => id === payload.id)
        findIndex && state.phoneNumbers.splice(findIndex, 1, { ...payload })
    },
    DELETE_ITEM(state, payload) {
        const findIndex = state.phoneNumbers.findIndex(({ id }) => id === payload)
        findIndex && state.phoneNumbers.splice(findIndex, 1)
    }
}

const actions = {
    async getAllPhoneNumbers({ commit }) {
        return await api.get('/phone-number')
        .then((response) => {
            commit('SET_ALL_ITEMS', response)
            console.log(response)
            return response
        })
    },
    async editPhoneNumber({ commit }, data) {
        return await api.put('/phone-number/', {...data})
        .then((response) => {
            console.log(response, 'response')
            commit('EDIT_ITEM', data)
            return response
        })
    },
    async deletePhoneNumber({ commit }, data) {
        return await api.deleteAPI(`/phone-number/${data}`)
        .then((response) => {
            console.log(response, 'response')
            commit('DELETE_ITEM', data)
            return response
        })
    }
}

const getters = {
    phoneHeaders: ({ phoneHeaders }) => phoneHeaders,
    phoneNumbers: ({ phoneNumbers }) => phoneNumbers
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}