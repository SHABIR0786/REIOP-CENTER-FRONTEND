import { getLocalStorage, setLocalStorage, clearLocalStorage, clearSessionStorage } from '../../utils/localStorage'
import * as api from "../Services/api"

export const state = {
    isLogged: false,
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
