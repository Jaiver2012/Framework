<template>
  <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{desserts.length}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer>
            <v-btn color="blue" text @click="add">Agregar usuario</v-btn>
        </v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ }">
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              color="blue"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

          </template>
       
        
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <h1></h1>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastName" label="Apellido"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.role" label="Rol"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="Contraseña" type="password"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <div class="my-2">
        <v-btn rounded color="success" @click="editItem(item)">Editar</v-btn>
        <v-btn rounded color="red" @click="deleteItem(item)">Eliminar</v-btn>
      </div>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>

  </v-data-table>


  

</template>

<style scoped>
</style>

<script>
import db from "../config/firebase";
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Apellido", value: "lastName" },
      { text: "Email", value: "email" },
      { text: "Password", value: "password" },
      { text: "Rol", value: "role" },
      { text: "Acciones", value: "action", sortable: false }
    ],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      role:"",
      
    },
    defaultItem: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      role:"",
    },
    idItem:null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agrega un usuario" : "Editar usuario";
    }
  },

  mounted() {
     
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

 

  methods: {
    initialize() {
        this.desserts=[];
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data={
                'name':doc.data().name,
                'email':doc.data().email,
                'lastName':doc.data().lastName,
                'password':doc.data().password,
                'role':doc.data().role,
                'id':doc.id

            }
            this.desserts.push(data);
          });
        });
    },

    add(){
        this.editedIndex=-1;
        this.dialog=true;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.idItem=item.id;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
        //var user = db.collection("users").doc(item.email).get();
        console.log("a ver:"+item.id)
         db.collection("users").doc(item.id).delete().then(function(){
            console.log("se borro");
        }).catch(function(error){
            console.error("error",error);
        })
       
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex ===-1) {
       //lo agregamos
        db.collection("users").add(this.editedItem)
        .then((docRef)=>{
            console.log("Document con ID:",docRef.id)
            this.initialize();
        }).catch(function(error){
            console.error("Error:",error);}
            );
            
        
        

      } else {
          //lo editamos
        //this.desserts.push(this.editedItem);
        db.collection("users").doc(this.idItem).update(this.editedItem)
        .then((docRef)=>{
            console.log("se edito",docRef.id);
            
        })
        .catch(function(error){
            console.error("error al editar",error);
        });
         this.initialize();
      }
     
      this.close()
      
    }
  },

   created() {
     this.initialize();
  },
};
</script>