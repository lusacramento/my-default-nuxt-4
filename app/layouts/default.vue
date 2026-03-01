<template>
  <div>
    <div v-if="loggedIn">
      <LayoutsProjectNav />
    </div>
    <div v-else>
      <LayoutsMainNav />
    </div>
    <slot />
    <LayoutsFooter />
  </div>
</template>

<script lang="ts" setup>
  const { loggedIn } = useUserSession();
</script>

<style>

</style>