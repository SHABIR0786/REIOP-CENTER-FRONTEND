import { getLocalStorage, setLocalStorage, clearLocalStorage, clearSessionStorage } from '../../utils/localStorage'
import * as api from "../Services/api"

export const state = {
    isLogged: false,
    isReset: false,
    isForgotData: {},
    resetPassword: {},
    accessToken: getLocalStorage('accessToken') || '',
    authUser: JSON.parse(getLocalStorage('authUser')) || {},
    adminMode: getLocalStorage('adminMode') || false,
}

export const mutations = {
    SIGN_IN(state, {user, token}) {
        state.isLogged = true;
        state.authUser = user || {};
        state.accessToken = token;
        setLocalStorage('accessToken', token);
        setLocalStorage('authUser', JSON.stringify(user));
    },
    FORGOT_PASSWORD(state, data) {
        state.isForgotData = data;
    },
    RESET_PASSWORD(state, data) {
        state.isReset = true;
        state.resetPassword = data;
    },
    Switch_Company_Team(state, {user}) {
        state.isLogged = true;
        state.authUser = user || {};
        setLocalStorage('authUser', JSON.stringify(user));
    },
    LOGOUT(state) {
        state.isLogged = false;
        state.authUser = null;
        state.accessToken = '';
        clearLocalStorage();
        clearSessionStorage();
    },
    SET_ADMIN_MODE(state, payload) {
        state.adminMode = payload;
    }
}

export const actions = {
    async login({ commit }, {vm, email, password}) {
        let userData = await api.post('/auth/login', {email, password});
        if (userData && userData.access_token) {
            api.setHeader(userData.access_token);
            commit('SIGN_IN', {user: userData.user, token: userData.access_token})
        }else if(userData.status == 401){
            vm.$bvToast.toast(userData.error, {
                title: 'Oops!',
                solid: true,
                variant: 'danger',
                autoHideDelay: 4000,
            })
            
            return ;

        }else if(userData.status == 422){
            vm.$bvToast.toast(userData.error['email']?userData.error['email']:''+' '+userData.error['password']?userData.error['password']:'', {
                title: 'Oops!',
                solid: true,
                variant: 'danger',
                autoHideDelay: 4000,
            })
            return ;
        }
        commit('SET_ADMIN_MODE', false)
        setLocalStorage('adminMode',false);
        return userData;
    },
    async forgot({ commit }, {vm, email}) {
        let Response = await api.post('/auth/forgot', {email});
        if (Response.success == true) {
            vm.$bvToast.toast(Response.message, {
                title: 'Message',
                solid: true,
                variant: 'success',
                autoHideDelay: 4000,
            })
            
            commit('FORGOT_PASSWORD',Response.user)
        }else if(Response.status == 401){
            vm.$bvToast.toast(Response.error, {
                title: 'Oops!',
                solid: true,
                variant: 'danger',
                autoHideDelay: 4000,
            })
            
            return ;

        }else if(Response.status == 422){
            vm.$bvToast.toast(Response.error['email']?Response.error['email']:'', {
                title: 'Oops!',
                solid: true,
                variant: 'danger',
                autoHideDelay: 4000,
            })
            return ;
        }
        return Response;
    },
    async resetPassword({ commit }, {vm, form}) {
        let Response = await api.post('/auth/resetPassword', {...form});
        if (Response.success == true) {
            vm.$bvToast.toast(Response.message, {
                title: 'Message',
                solid: true,
                variant: 'success',
                autoHideDelay: 4000,
            })
            
            commit('RESET_PASSWORD',Response.user)
        }else if(Response.status == 401){
            vm.$bvToast.toast(Response.error, {
                title: 'Oops!',
                solid: true,
                variant: 'danger',
                autoHideDelay: 4000,
            })
            
            return ;

        }else if(Response.status == 422){
            vm.$bvToast.toast(Response.error['password']?Response.error['password']:'' + ' Enter Valid Data', {
                title: 'Oops!',
                solid: true,
                variant: 'danger',
                autoHideDelay: 4000,
            })
            return ;
        }
        return Response;
    },
    async logout({ commit }) {
        await api.post('/auth/logout');
        api.setHeader(null);
        commit('LOGOUT');
        window.location.href = '/login';
    },
    switchToAdminView({commit}) {
        commit('SET_ADMIN_MODE',true);
        setLocalStorage('adminMode',true);
    },
    switchToTeamView({commit}){
        commit('SET_ADMIN_MODE', false)
        setLocalStorage('adminMode',false);

    },
    async switchCompanyTeam({ commit }, data) {
         await api.post(`/auth/switchCompanyTeam`, {...data}).then((response) => {
            commit('Switch_Company_Team', {user: response.user})

        })
    },
}

export const getters = {
    isLogged: ({ isLogged }) => isLogged,
    getAuthUser: ({ authUser }) => authUser,
    getAdminMode: ({adminMode}) => JSON.parse(adminMode),
    isReset: ({ isReset }) => isReset,

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
