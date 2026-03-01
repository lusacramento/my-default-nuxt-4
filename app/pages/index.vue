<template>
    <Container>
        <LayoutsHeader :page-name="pageName" />
        <TemplatesToast id="index-toast" />
    </Container>
</template>

<script lang="ts" setup>
import { useToast } from '~/composables/domain/toast';
const pageName = useRuntimeConfig().public.appName

onMounted(() => {
  useToast().execute();
});
</script>
