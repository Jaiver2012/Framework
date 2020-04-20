<template>
    <v-card width="100%">
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
export default {
    name: 'CardMessage',
    props:['messageData'],
    methods:{
        responseComment(message){
            this.$store.commit('changeCurrentMessageToResponse',message);
            this.$router.push('/addCommentForum/1');
        }
    }
}
</script>

<style>

</style>