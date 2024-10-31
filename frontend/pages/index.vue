<script setup lang="ts"></script>

<template>
  <div>
    <h1>Home page</h1>
    <ul>
      <li>
        <NuxtLink :to="{ name: 'page1-id', params: { id: 10 } }"
          >page 1</NuxtLink
        >
      </li>
      <li><NuxtLink to="/page2">page 2</NuxtLink></li>
      <li><NuxtLink to="/page3">page 3</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped></style>
