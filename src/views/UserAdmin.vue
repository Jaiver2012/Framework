<template>
  <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{desserts.length}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ }">
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              color="success"
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
                    <v-text-field v-model="editedItem.name" label="name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastname" label="lastname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="email"></v-text-field>
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
        <v-btn rounded color="red" @click="editItem(item)">Eliminar</v-btn>
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
      { text: "Apellido", value: "lastname" },
      { text: "Email", value: "email" },
      { text: "Password", value: "password" },
      { text: "Acciones", value: "action", sortable: false }
    ],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      lastname: "",
      email: "",
      password: ""
    },
    defaultItem: {
      name: "",
      lastname: "",
      email: "",
      password: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Detalles del reporte";
    }
  },

  mounted() {
    
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
      this.initialize();
  },

  methods: {
    initialize() {
      db.collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              name: doc.data().name,
              email: doc.data().email,
              lastname: doc.data().lastName
            };
            console.log(data)
            this.desserts.push(data);
          });
        });
    },


    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>