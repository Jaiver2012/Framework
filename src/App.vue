<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Forum</v-toolbar-title>  
      <v-spacer></v-spacer>
      
      <div class="mr-10">
        <v-btn large to="/login" color="light-green accent-4" elevation=10>
          Login
        </v-btn>
      </div>
      <div class="mr-10">
        <v-btn large to="/register" color="light-green accent-4" elevation=10>
          Register
        </v-btn>
      </div>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    
    
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
  
  },

  data: () => ({
    //
  }),
};
</script>
