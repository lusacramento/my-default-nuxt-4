<template>
    <div>
        <LayoutsHeader :page-name="pageName" />
    </div>
</template>

<script lang="ts" setup>
    const pageName = useRuntimeConfig().public.appName
</script>
