<template>

    <v-card width="100%">

        <div v-if="messageData.dad != this.$store.state.currentIndexForum.subject" class="blue-grey lighten-5">
            <h2 class="font-weight-medium ml-10">Respuesta a:</h2>
            <v-card-title class="font-weight-light">
            Comentario de {{messageDad.creator}}
            </v-card-title>
            <v-card-subtitle class="caption font-weight-bold">
            Creado: {{messageDad.creationDate}}
            </v-card-subtitle>
            <v-card-text class="body-1 font-weight-light">  
            {{messageDad.message}}
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
            <v-btn text class="mr-10" v-if="messageData.creator==$store.state.currentUser" :disabled="dissableDelete" @click="showDialogDeleteMessage">
                Eliminar
                <v-icon right>delete</v-icon>
            </v-btn>
            <v-btn text class="mr-10" v-if="messageData.creator==$store.state.currentUser">
                Editar
                <v-icon right>create</v-icon>
            </v-btn>
            <v-btn text class="mr-10" @click="responseComment(messageData)">
                Responder
                <v-icon right>trending_flat</v-icon>
            </v-btn>
        </v-card-actions>

        <v-dialog
            v-model="dialog"
            max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Eliminar mensaje</v-card-title>
                    <v-card-text>
                        ¿Esta seguro de eliminar este mensaje?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        
                        <v-btn
                        color="primary darken-1"
                        text
                        @click="dialog = false"
                        >
                            No
                        </v-btn>

                        <v-btn
                        color="#C62828"
                        text
                        @click="deleteMessage"
                        >
                            Sí
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
    </v-card>
     
</template>

<script>
import db from '../config/firebase';

export default {
    name: 'CardMessage',
    data() {
        return {
            overlay: false,
            messageDad:{},
            dialog: false
        }
    },
    props:['messageData'],
    computed: {
        dissableDelete(){
            
            return !!this.messageData.sons.length;
        }
    },
    methods:{
        responseComment(message){
            this.$store.commit('changeCurrentMessageToResponse',message);
            this.$router.push('/addCommentForum/1');
        },
        bringDadMessage(){
            db.collection("messages").
            where("forumSubject","==",this.$store.state.currentIndexForum.subject).
            where("sons","array-contains",this.messageData.message).get().then(
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
        },
        showDialogDeleteMessage(){
            this.dialog = true
        },
        async deleteMessage(){
            this.overlay = true;

            var idDoc='';
                
            await db.collection("messages").
            where("forumSubject","==",this.$store.state.currentIndexForum.subject).
            where('message','==',this.messageData.message).
            get().then(
                querySnapshot => {
                    querySnapshot.forEach(  doc => {
                    idDoc=doc.id;
                    
                    })
                }
            );

            await db.collection("messages").doc(idDoc).delete();

            this.overlay = false;
            this.dialog = false;
        }   
    },
    created() {
        this.bringDadMessage();
    },
}
</script>

<style>

</style>