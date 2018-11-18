<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list subheader>
          <v-subheader>Lista de Compras  
            <v-btn outline color="primary" dark @click="addItem">Novo Item
              <v-icon dark right>add</v-icon>
            </v-btn>
          </v-subheader>
          <v-divider></v-divider>
           
           <v-subheader v-if="items.length == 0">Nenhum item cadastrado!</v-subheader>
          <template v-for="(item,index) in items">
            <v-list-tile
              :key="item.title"
              avatar
              ripple             
            >

            <v-list-tile-action>
              <v-icon v-if="item.purchased"
                  @click="purchasedItem(item)"
                  color="grey"
                >
                  remove_shopping_cart
                </v-icon>
              <v-icon v-if="!item.purchased"
                  @click="purchasedItem(item)"
                  color="grey"
                >
                  shopping_cart
                </v-icon>
            </v-list-tile-action>
            
            <v-list-tile-avatar v-if="item.picture">
              <img :src="getImage(item.picture)">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title :class="item.purchased ? 'purchased' : ''">{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title :class="item.purchased ? 'purchased' : ''">{{ item.description }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-action-text :class="item.purchased ? 'purchased' : ''">R$ {{ item.price | number_format_real }}</v-list-tile-action-text>
              <v-btn-toggle>
                <v-icon
                  @click="editItem(item)"
                  color="grey lighten-1"
                >
                  edit
                </v-icon>
                <v-icon
                  @click="deleteItem(item)"
                  color="grey lighten-1"
                >
                  delete
                </v-icon>
            </v-btn-toggle>
              <!-- <v-icon :color="item.purchased ? 'teal' : 'grey'">chat_bubble</v-icon> -->
            </v-list-tile-action>
          </v-list-tile>
          <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            ></v-divider>
          </template> 
        </v-list>
      </v-card>
    </v-flex>


    <v-dialog v-model="openModal" max-width="600px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">{{ newItem ? 'Novo Item' : 'Editando Item'}}</span>
        </v-card-title>
        <v-card-text>
            <v-alert
              :value="error"
              type="error"
            >
              {{error}}
            </v-alert>
            <v-layout wrap>
              <v-flex md12 style="text-align: center" v-if="itemModal.picture">
                <img width="180" :src="getImage(itemModal.picture)">
              </v-flex>
              <v-flex md12>
                <v-text-field label="Nome *" v-model="itemModal.name"></v-text-field>
              </v-flex>
              <v-flex md12>
                  <v-textarea
                    v-model="itemModal.description"
                    auto-grow
                    label="Descrição"
                    rows="1"
                  ></v-textarea>
              </v-flex>
              <v-flex md12>
                <v-text-field label="Preço" type="number" v-model="itemModal.price"></v-text-field>
              </v-flex>
              <v-flex md12>
                <input type="file" name="picture" id="picture">
                <!-- <v-text-field label="Foto" type="file" v-model="itemModal.picture"></v-text-field> -->
              </v-flex>
            </v-layout>
          <small>* Campos Obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="openModal = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click="saveItem">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      openModal: false,
      newItem: true,
      itemModal: {},
      error: ""
    };
  },
  methods: {
    getImage(image) {
      return process.env.BASE_HOST + image;
    },
    getItems() {
      let self = this;
      self.axios
        .get(process.env.BASE_URL + "item")
        .then(result => {
          self.items = result.data.data;
        })
        .catch(error => {
          alert(error);
        });
    },
    purchasedItem(item) {
      let self = this;

      let itemSelected = JSON.parse(JSON.stringify(item));
      itemSelected.purchased = !item.purchased;

      self.axios
        .put(process.env.BASE_URL + "item/" + itemSelected.id, itemSelected)
        .then(result => {
          self.getItems();
        })
        .catch(error => {
          alert(error);
        });
    },
    addItem(item) {
      let self = this;

      self.error = "";
      self.openModal = true;
      self.newItem = true;

      self.itemModal = {
        name: "",
        description: "",
        price: "",
        purchased: false
      };
    },
    editItem(item) {
      let self = this;

      self.error = "";
      self.openModal = true;
      self.newItem = false;

      self.itemModal = JSON.parse(JSON.stringify(item));
    },
    saveItem() {
      let self = this;

      let form = new FormData();
      form.append("description", self.itemModal.description);
      form.append("name", self.itemModal.name);

      let picture = document.getElementById("picture").files[0]
        ? document.getElementById("picture").files[0]
        : self.itemModal.picture;

      form.append("picture", picture);
      form.append("price", self.itemModal.price || null);
      form.append("purchase_date", self.itemModal.purchase_date || null);
      form.append("purchased", self.itemModal.purchased);
      form.append("_method", "PUT");

      // Insert
      if (self.newItem) {
        self.axios
          .post(process.env.BASE_URL + "item", form, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(result => {
            self.openModal = false;
            self.getItems();
          })
          .catch(error => {
            self.error = error.response.data.message;
            // alert(error);
          });
      } else {
        //Update
        form.append("id", self.itemModal.id);

        self.axios
          .put(process.env.BASE_URL + "item/" + self.itemModal.id, form, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(result => {
            self.openModal = false;
            self.getItems();
          })
          .catch(error => {
            self.error = error.response.data.message;
            // alert(error);
          });
      }
    },
    deleteItem(item) {
      let self = this;

      if (confirm(`Deseja excluir o item ${item.name}?`)) {
        self.axios
          .delete(process.env.BASE_URL + "item/" + item.id, item)
          .then(result => {
            self.getItems();
          })
          .catch(error => {
            alert(error);
          });
      }
    }
  },
  mounted() {
    this.getItems();
  }
};
</script>

<style scoped>
.purchased {
  text-decoration: line-through;
}
</style>

