<template>
<v-container class="center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12"  sm="4" md="4" >
          <v-card class="elevation-12 pa-md-4 mx-lg-auto">
            <v-window>
                <v-row justify='center'>
                   <v-card-title>
                       Registro
                   </v-card-title>
                </v-row>
                <v-col cols="12" md="12">
                    <v-card-text class="mt-5">

                        <v-form>
                            <h2 class="ml-5">Introduzca email con el qe se quiere registrar</h2>
                            <br>
                            <v-text-field
                            v-model="email"
                            label="Email"
                            name="Email"
                            append-icon="email"
                            type="text"
                            color="blue"
                            outlined
                            :rules="emailRules"
                            >
                            </v-text-field>

                            <h2 class="ml-5">Introduzca contraseña de su sesión</h2>
                            <br>
                            <v-text-field
                            v-model="password1"
                            id="password"
                            label="Password"
                            name="Password"
                            append-icon="lock"
                            type="password"
                            color="blue"
                            outlined
                            :rules="passwordRules1"
                            >
                            </v-text-field>

                            <h2 class="ml-5">Confirmar contraseña</h2>
                            <br>
                            <v-text-field
                            v-model="password2"
                            id="password"
                            label="Password"
                            name="Password"
                            append-icon="lock"
                            type="password"
                            color="blue"
                            outlined
                            :rules="passwordRules2"
                            >
                            </v-text-field>

                        </v-form>

                    </v-card-text>
                </v-col>
              
                <div class="text-center mt-3">
                    <v-btn 
                    :disabled="disabledButton"
                    @click="register" 
                    class="margin-bottom: 30px" 
                    rounded  
                    large 
                    color="blue"
                    > Registrarse</v-btn>
                </div>
             
              
            </v-window> 
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'Register',
    data() {
        return {
            show: true,
            email:'',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail debe ser válido',
            ],
            password1:'',
            passwordRules1: [
                v => (v.length>4) || 'La contraseña debe tener más de 4 caracteres',

            ],
            password2:'',
            passwordRules2: [
                v => (v.length>4) || 'La contraseña debe tener más de 4 caracteres',
                value=> value===this.password1 || "Las contraseñas no coinciden"
            ],
        }
    },
    methods: {
        register(){
            
        }
    },
    computed: {
        disabledButton(){
            console.log("email: "+this.email);
            console.log("p2: "+this.password1);
            console.log("p1: "+this.password2);
            return( !this.email || !this.password1 || !this.password2 || !(this.password1 === this.password2) );
        }
    },

}
</script>

<style>

</style>