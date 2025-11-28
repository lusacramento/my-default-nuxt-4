<template>
    <Container>
        <LayoutsHeader :page-name="pageName" />
    </Container>
</template>

<script lang="ts" setup>
    const pageName = useRuntimeConfig().public.appName
</script>
