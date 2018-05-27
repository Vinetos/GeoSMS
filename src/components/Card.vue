<template>
  <div v-if="title || description" id="card">
    <h1 id="title">{{title}}</h1>
    <span id="description">{{description}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {type: String, default: undefined},
    description: {type: String, default: undefined}
  }
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
  font-size: 15px;
}
</style>
