import Vue from "vue"
import Vuex from "vuex"

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

import uxModule from "./Modules/uxModule"
import loginModule from "./Modules/loginModule"
import homeModule from "./Modules/homeModule"
import importModule from "./Modules/importModule"
import emailModule from "./Modules/emailModule"
import goldenAddressModule from "./Modules/goldenAddressModule"
import listModule from "./Modules/listModule"
import sellerModule from "./Modules/sellerModule"
import phoneNumberModule from "./Modules/phoneNumberModule"
import subjectModule from "./Modules/subjectModule"
import labelModule from "./Modules/labelModule"
import propertyModule from "./Modules/propertyModule";
import backgroundProcesses from "./Modules/backgroundProcessesModule"

const state = {}

const mutations = {}

const actions = {}

export default new Vuex.Store({
    modules: {
        uxModule: uxModule,
        loginModule: loginModule,
        homeModule: homeModule,
        emailModule: emailModule,
        goldenAddressModule: goldenAddressModule,
        listModule: listModule,
        importModule: importModule,
        sellerModule: sellerModule,
        phoneNumberModule: phoneNumberModule,
        subjectModule: subjectModule,
        labelModule: labelModule,
        propertyModule: propertyModule,
        backgroundProcessesModule: backgroundProcesses
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
