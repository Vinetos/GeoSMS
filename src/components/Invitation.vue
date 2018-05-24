/*
In this page, we will get the user position and send it to the database (to update the operator's map)
*/
<template>
  <p>Your path : {{path}}</p>
</template>

<script>
export default {
  props: ['path']
}
</script>
