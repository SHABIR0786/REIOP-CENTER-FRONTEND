import * as api from "../Services/api"

const state = {
    fields: [
        {key:"id", label: "Id", sortable: true},
        {key: "actions", label: "Actions"},
        {key: "marketing_channel_name", label: "Marketing Channel Name", sortable: true},
        {key: "user_name", label: "Uploaded By"},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"updated_at", label: "Updated Date", sortable: true},
    ],
    marketingChannels: [],
    marketingChannelsForDropDown:[],
    total: 0,
}

const mutations = {
    SET_ALL_MARKET_CHANNELS(state, payload) {
        const data = [...payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        });

        state.marketingChannels = [...data]
    },
    SET_MARKET_CHANNELS_FOR_DROPDOWN(state, payload) {
        state.marketingChannelsForDropDown = [...payload]
    },
    EDIT_MARKET_CHANNEL(state, payload) {
        const findIndex = state.marketingChannels.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.marketingChannels.splice(findIndex, 1, { ...payload })
    },
    DELETE_MARKET_CHANNEL(state, payload) {
        const findIndex = state.marketingChannels.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.marketingChannels.splice(findIndex, 1)
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    ADD_MARKET_CHANNEL(state, payload) {
        const findIndex = state.marketingChannels.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && state.marketingChannels.splice(findIndex, 1, { ...payload })
        const data = [payload]
        data.forEach(e => {
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
        });
        state.marketingChannels.push(data[0])
    },
}

const actions = {
    async getAllMarketChannels({ commit, dispatch }, {page, perPage}) {
        return await api.get(`/marketingChannels?page=${page}&perPage=${perPage}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.marketingChannels && response.marketingChannels.data) {
                commit('SET_ALL_MARKET_CHANNELS', response.marketingChannels.data)
            }else{
                commit('SET_ALL_MARKET_CHANNELS', [])

            }

            return response
        })
    },
    async marketingChannelsForDropDown({ commit, dispatch }) {
        return await api.get(`/marketingChannelsForDropDown`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.marketingChannels) {
                commit('SET_MARKET_CHANNELS_FOR_DROPDOWN', response.marketingChannels)
            }else{
                commit('SET_MARKET_CHANNELS_FOR_DROPDOWN', [])
            }

            return response
        })
    },
    async searchMarketChannel({ commit, dispatch }, {page, perPage, search}) {
        return await api.get(`/marketingChannels?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, {root: true})
            }

            if(response && response.marketingChannels && response.marketingChannels.data) {
                commit('SET_ALL_TYPES', response.marketingChannels.data)
            }

            return response
        })
    },
    async editMarketChannel({ commit }, data) {
        return await api.put(`/marketingChannels/${data.id}`, {...data}).then((response) => {
            commit('EDIT_MARKET_CHANNEL', data)
            return response
        })
    },
    async addMarketChannel({ commit }, data) {
        return await api.post(`/marketingChannels`, {...data}).then((response) => {
            commit('ADD_MARKET_CHANNEL', response.marketingChannels)
            return response
        })
    },
    async deleteMarketChannel({ commit }, data) {
        return await api.deleteAPI(`/marketingChannels/${data}`).then((response) => {
            commit('DELETE_MARKET_CHANNEL', data)
            return response
        })
    },

    async getTotal({ commit }) {
        return await api.get(`/totals/marketingChannels`).then((response) => {
            if (response && response.count > -1) {
                commit ('GET_TOTAL', response.count);
            }
            return response
        })
    }
}

const getters = {
    fields: ({ fields }) => fields,
    marketingChannels: ({ marketingChannels }) => marketingChannels,
    total: ({total}) => total,
    marketingChannelsForDropDown: ({ marketingChannelsForDropDown }) => marketingChannelsForDropDown,

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
