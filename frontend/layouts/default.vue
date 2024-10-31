<script setup lang="ts"></script>

<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
nav {
  margin-bottom: 20px;
}
</style>
