<template>
    <v-container class="center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12"  sm="4" md="4" >
          <v-card class="elevation-12 pa-md-4 mx-lg-auto">
            <v-window>
               <div class="text-center">
                 Login
               </div>
              <v-col cols="12" md="12">
                <v-card-text class="mt-12">
                <v-form>
                <v-text-field
                label="Email"
                name="Email"
                prepend-icon="email"
                type="text"
                color="blue"
                >
                  
                </v-text-field>

                <v-text-field
                id="password"
                label="Password"
                name="Password"
                prepend-icon="lock"
                type="password"
                color="blue"
                >

                </v-text-field>
              </v-form>
              <h3 class="text-center mt-3">¿Olvidaste tu contraseña?</h3>
              </v-card-text>
              </v-col>
              
              <div class="text-center mt-3">
                <v-btn class="margin-bottom: 20px" rounded color="blue" dark> Iniciar</v-btn>
              </div>
             
              
            </v-window> 
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'Login',

    data: () => ({
     
    }),
    props:{
     
    }
  }
</script>
<style scoped>


</style>
