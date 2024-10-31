<script setup lang="ts">
const route = useRoute();
const { id } = route.params;
</script>

<template>
  <h1>Страница 1 - {{ id }}</h1>
</template>

<style scoped></style>
