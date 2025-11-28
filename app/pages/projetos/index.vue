<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
    <TemplatesToast id="projetos-toast" />
  </Container>
</template>

<script lang="ts" setup>
import { useMyToastStore } from '~/stores/toast';

const pageName = 'Projetos'

const toast = useMyToastStore();

onMounted(() => {
  if (toast.isLoaded) toast.show();
}); 
</script>