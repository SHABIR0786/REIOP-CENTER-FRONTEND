import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store"
import { routes } from "./routes"

Vue.use(VueRouter)

let router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((rec) => rec.meta.requireAuth)) {
        if (store.getters['loginModule/isLogged']) {
            const superAdminUrls = ['/users','/company','/teams','/plans'];
            if(superAdminUrls.includes(to.path)){ 
                (store.getters['loginModule/getAuthUser']?.role == 1) ? next() : next({name: "Home"});
            } 
            next()
        } else {
            next({name: "Login"})
        }
    } else {
        next()
    }
})

export default router
