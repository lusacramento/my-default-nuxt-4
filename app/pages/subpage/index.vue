<template>
  <div>
    <h1>Subpage</h1>
    <hr>
    <h2>Test Pinia data</h2>
    <span>{{ data }}</span>
  </div>
</template>

<script lang="ts" setup>
const { data } = storeToRefs(useMyTestPiniaStore())
 console.log(data.value)
</script>

<style>

</style>