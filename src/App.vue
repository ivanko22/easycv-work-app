<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style lang="scss">
  @use "@/assets/css/main.scss" as *;

  #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      input:-webkit-autofill,
      input:-webkit-autofill:focus {
        transition: background-color 600000s 0s, color 600000s 0s;
      }
    }
</style>
