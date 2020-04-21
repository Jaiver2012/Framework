import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser:'',
        forums:[

        ],
        currentIndexForum:{

        },
        currentMessageToResponse:{

        },
        
    },
    mutations: {
        loadForums(state, listCharged){
            state.forums = listCharged
        },
        changeCurrentForum(state,index){
            state.currentIndexForum = state.forums[index];
        },
        changeCurrentUser(state,user){
            state.currentUser = user;
        },
        changeCurrentMessageToResponse(state,mesage){
            state.currentMessageToResponse= mesage;
        }
    },
    actions: {
    },
    modules: {
    }
})