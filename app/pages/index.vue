<template>
    <Container>
        <LayoutsHeader :page-name="pageName" />
        <TemplatesToast id="index-toast" />
    </Container>
</template>

<script lang="ts" setup>
import { useMyToastStore } from '~/stores/toast';

const pageName = useRuntimeConfig().public.appName
const toast = useMyToastStore();

onMounted(() => {
  if (toast.isLoaded) toast.show();
});
</script>
