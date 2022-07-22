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
import propertyModule from "./Modules/propertyModule"
import backgroundProcessesModule from "./Modules/backgroundProcessesModule"
import errorModule from "./Modules/errorModule"
import importV2Module from "./Modules/importV2Module";
import templatesModule from "./Modules/templatesModule";
import teamModule from "./Modules/teamModule";
import userModule from "./Modules/userModule";
import phoneTypesModule from "./Modules/phoneTypesModule";
import subjectTypesModule from "./Modules/subjectTypesModule";
import companyTypesModule from "./Modules/companyTypesModule";
import marketingChannelModule from "./Modules/marketingChannelModule";
import filterModule from "./Modules/filterModule";
import companyModule from "./Modules/companyModule";




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
        backgroundProcessesModule: backgroundProcessesModule,
        errorModule: errorModule,
        importV2Module: importV2Module,
        templatesModule: templatesModule,
        teamModule: teamModule,
        phoneTypesModule: phoneTypesModule,
        subjectTypesModule: subjectTypesModule,
        companyTypesModule: companyTypesModule,
        marketingChannelModule: marketingChannelModule,
        filterModule: filterModule,
        userModule: userModule,
        companyModule: companyModule

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
