<template>
<v-app>
  <v-toolbar color="primary">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

    <v-toolbar-title class="white--text" >Market List</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon color="primary" v-show="logged" @click="logout">
      <v-icon>logout</v-icon>
    </v-btn>
  </v-toolbar>

  <v-content>
    <router-view/>
  </v-content>

  <v-footer fixed dark>
    <v-layout justify-center>
      <strong> Jonathas Tassi e Silva | Fatec</strong>
    </v-layout>
  </v-footer>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      logged: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push({ name: "Login" });
      this.logged = false;
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  },
  name: "App"
};
</script>
