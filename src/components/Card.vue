<template>
  <div id="card">
    <h1 id="title">{{title}}</h1>
    <span id="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet tortor non nulla dapibus iaculis. Nunc metus justo, dapibus vel gravida faucibus, volutpat sit amet tortor.</span>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['title']
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

#card {
  border-radius: 3px;
  background: #fff;
  padding: 10px;
  position: relative;
  font-family: 'Montserrat', sans-serif;
  font-weight:normal;
}
#title {
  margin: 0 !important;
  font-size: 30px;
  text-transform: uppercase;
}
#description {
  font-size: 12px;
}
</style>
