<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Nova Conta</v-toolbar-title>                
              </v-toolbar>
              <v-card-text>                              
                <v-alert
                  :value="error"
                  type="error"
                >
                  {{error}}
                </v-alert>
                <v-form>
                  <v-text-field prepend-icon="person" name="name" label="Nome" type="text" v-model="user.name"></v-text-field>
                  <v-text-field prepend-icon="person" name="email" label="E-mail" type="email" v-model="user.email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Senha" id="password" type="password" v-model="user.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn to="/login">Entrar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">Criar</v-btn>

  
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    register() {
      let self = this;
      self.error = "";
      self.axios
        .post(process.env.BASE_URL + "user/register", self.user)
        .then(result => {
          this.$router.push({ name: "Login" });
        })
        .catch(error => {
          if (error) {
            self.error = error.response.data.message;
          }
        });
    }
  }
};
</script>

<style scoped>
</style>

