<template>
    <v-container>
        <v-row>
            <h1>Asunto:</h1>
            
        </v-row>

    </v-container>
    
    
</template>

<script>
import  { mapState } from 'vuex';

export default {
    name:'Forum',
    data() {
        return {
            iidf: this.$route.params.id
        }
    },
    computed: {
        ...mapState(['favorites'])
    },
    methods: {
        
    },
}
</script>

<style>

</style>