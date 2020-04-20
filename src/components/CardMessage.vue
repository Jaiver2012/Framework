<template>
    
    <v-card width="100%">

        <div v-if="messageData.dad != this.$store.state.currentIndexForum.subject" class="blue-grey lighten-5">
            <h2 class="font-weight-medium ml-10">Respuesta a:</h2>
            <v-card-title class="font-weight-light">
            Comentario de {{messageData.creator}}
            </v-card-title>
            <v-card-subtitle class="caption font-weight-bold">
            Creado: {{messageData.creationDate}}
            </v-card-subtitle>
            <v-card-text class="body-1 font-weight-light">  
            {{messageData.message}}
            </v-card-text>
        </div>

        <v-card-title>
            Comentario de {{messageData.creator}}
        </v-card-title>
        <v-card-subtitle>
            Creado: {{messageData.creationDate}}
        </v-card-subtitle>
       
        <v-divider class="mx-5"></v-divider>
        <v-card-text class="headline font-weight-bold">
            {{messageData.message}}
        </v-card-text>
        
         <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn text class="mr-10" v-if="messageData.creator==$store.state.currentUser">
                Editar
                <v-icon right>create</v-icon>
            </v-btn>
            <v-btn text class="mr-10" @click="responseComment(messageData)">
                Responder
                <v-icon right>create</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
    
</template>

<script>
import db from '../config/firebase';

export default {
    name: 'CardMessage',
    data() {
        return {
            messageDad:{}
        }
    },
    props:['messageData'],
    methods:{
        responseComment(message){
            this.$store.commit('changeCurrentMessageToResponse',message);
            this.$router.push('/addCommentForum/1');
        },
        bringDadMessage(){
            db.collection("messages").
            where("forumSubject","==",this.$store.state.currentIndexForum.subject).
            where("son","==",this.messageData.message).get().then(
                querySnapshot => {
                    querySnapshot.forEach(  doc => {
                        const data = {
                            'message': doc.data().message,
                            'forumSubject': doc.data().forumSubject,
                            'creator': doc.data().creator,
                            'creationDate': doc.data().creationDate,
                            'dad': doc.data().dad
                        }
                        this.messageDad = data ;
                    })
                }
            );
        }
    }
}
</script>

<style>

</style>