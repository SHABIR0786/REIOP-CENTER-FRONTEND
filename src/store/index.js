import Vue from "vue"
import Vuex from "vuex"

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

import uxModule from "./Modules/uxModule"
import homeModule from "./Modules/homeModule"
import importModule from "./Modules/importModule"
import emailModule from "./Modules/emailModule"
import goldenAddressModule from "./Modules/goldenAddressModule"
import listModule from "./Modules/listModule"
import sellerModule from "./Modules/sellerModule"
import phoneNumberModule from "./Modules/phoneNumberModule"
import subjectModule from "./Modules/subjectModule"

const state = {}

const mutations = {}

const actions = {}

export default new Vuex.Store({
    modules: {
        uxModule: uxModule,
        homeModule: homeModule,
        emailModule: emailModule,
        goldenAddressModule: goldenAddressModule,
        listModule: listModule,
        importModule: importModule,
        sellerModule: sellerModule,
        phoneNumberModule: phoneNumberModule,
        subjectModule: subjectModule
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