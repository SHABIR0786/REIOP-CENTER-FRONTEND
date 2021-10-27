import { getLocalStorage, setLocalStorage, clearLocalStorage, clearSessionStorage } from '../../utils/localStorage'
import * as api from "../Services/api"

export const state = {
    isLogged: false,
    accessToken: getLocalStorage('accessToken') || '',
    authUser: JSON.parse(getLocalStorage('authUser')) || {},
}

export const mutations = {
    SIGN_IN(state, {user, token}) {
        state.isLogged = true;
        state.authUser = user || {};
        state.accessToken = token;
        setLocalStorage('accessToken', token);
        setLocalStorage('authUser', JSON.stringify(user));
    },
    LOGOUT(state) {
        state.isLogged = false;
        state.authUser = null;
        state.accessToken = '';
        clearLocalStorage();
        clearSessionStorage();
    }
}

export const actions = {
    async login({ commit }, {vm, email, password}) {
        let userData = await api.post('/auth/login', {email, password});

        if (userData && userData.access_token) {
            api.setHeader(userData.access_token);
            commit('SIGN_IN', {user: userData.user, token: userData.access_token})
        } else {
            vm.$bvToast.toast('You have entered an invalid username or password.', {
                title: 'Oops!',
                solid: true,
                variant: 'danger',
                autoHideDelay: 4000,
            })
        }

        return userData;
    },
    async logout({ commit }) {
        await api.post('/auth/logout');
        api.setHeader(null);
        commit('LOGOUT');
        window.location.href = '/login';
    }
}

export const getters = {
    isLogged: ({ isLogged }) => isLogged,
    getAuthUser: ({ authUser }) => authUser
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
