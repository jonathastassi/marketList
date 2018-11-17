<template>
<h1>index</h1>
</template>

<script>
export default {
  data() {
    return {
      toBuy: [],
      bought: []
    };
  },
  methods: {
    getItems() {
      let self = this;
      self.axios
        .get(process.env.BASE_URL + "item")
        .then(result => {
          let data = result.data.data;
          self.toBuy = data.filter(item => {
            return item.purchased == 0;
          });
          self.bought = data.filter(item => {
            return item.purchased == 1;
          });
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  mounted() {
    this.getItems();
  }
};
</script>

<style scoped>
</style>

