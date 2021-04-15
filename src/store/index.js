import Vue from "vue"
import Vuex from "vuex"

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

import uxModule from "./Modules/uxModule"
import homeModule from "./Modules/homeModule"
import importModule from "./Modules/importModule"
import listModule from "./Modules/listModule"
import sellerModule from "./Modules/sellerModule"

const state = {}

const mutations = {}

const actions = {}

export default new Vuex.Store({
    modules: {
        uxModule: uxModule,
        homeModule: homeModule,
        listModule: listModule,
        importModule: importModule,
        sellerModule: sellerModule
    },

    state,
    mutations,
    actions,
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        })
    ]
})