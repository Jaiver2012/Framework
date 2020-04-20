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
    </v-card>
    
</template>

<script>
export default {
    name: 'CardMessage',
    props:['messageData']
}
</script>

<style>

</style>