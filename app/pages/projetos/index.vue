<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
    <TemplatesToast id="projetos-toast" />
  </Container>
</template>

<script lang="ts" setup>
import { useToast } from '~/composables/domain/toast';

definePageMeta({
  middleware: "authenticated",
});

const pageName = 'Projetos'

onMounted(() => {
  useToast().execute();
}); 
</script>