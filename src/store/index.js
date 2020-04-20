import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser:'luisfcv97@gmail.com',
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
        }
    },
    actions: {
    },
    modules: {
    }
})