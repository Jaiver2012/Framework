import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser:'',
        currentRol:'',
        forums:[

        ],
        currentIndexForum:{

        },
        currentMessageToResponse:{

        },
        currentMessageToEdit:{

        }
        
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
        },
        changeCurrentRol(state,rol){
            state.currentRol = rol;
        },
        changeCurrentMessageToEdit(state, message){
            state.currentMessageToEdit = message;
        }
    },
    actions: {
    },
    modules: {
    }
})