<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex sm:flex-row items-center justify-between gap-4 text-white py-4"
    >
      <RouterLink :to="{ name: 'home' }">
        <p class="text-2xl">Simple Weather</p>
      </RouterLink>
      <RouterLink :to="{ name: 'search' }" style="justify-content: flex-end">
        <i
          class="fa-solid fa-search text-xl hover:text-weather-tertiary duration-150 cursor-pointer flex gap-3 justify-end"
        ></i>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
