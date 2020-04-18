import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [

        {
            path: '/login',
            name: 'Login',
            component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
        }
    ]

})

  