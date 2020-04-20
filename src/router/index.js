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
        },
        {
            path: '/forums',
            name: 'Forums',
            component: () => import(/* webpackChunkName: "about" */ '../views/Forums.vue')
        },
        {
            path: '/createForum',
            name: 'CreateForum',
            component: () => import(/* webpackChunkName: "about" */ '../views/CreateForum.vue')
        },
        {
            path: '/forum',
            name: 'Forum',
            component: () => import(/* webpackChunkName: "about" */ '../views/Forum.vue')
        },
        {
            path: '/addCommentForum/:typeComment',
            name: 'AddCommentForum',
            component: () => import(/* webpackChunkName: "about" */ '../views/AddCommentForum.vue')
        }
    ]

})

  