<template>
  <Container class="mt-5 mb-3 text-center">
    <h1>{{ props.pageName }}</h1>
  </Container>
</template>

<script lang="ts" setup>
  const props = defineProps<{ pageName: string }>()
</script>

<style>

</style>