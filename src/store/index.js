import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser:'',
        forums:[

        ],
        currentIndexForum:{},
    },
    mutations: {
        loadForums(state, listCharged){
            state.forums = listCharged
        },
        changeCurrentForum(state,index){
            state.currentIndexForum = state.forums[index];
        },
        changeCurrentUer(state,user){
            state.currentUser = user;
        }
    },
    actions: {
    },
    modules: {
    }
})