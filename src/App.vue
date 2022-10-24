<script setup>
import Home from "./pages/home.vue";
</script>

<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  list-style: none;
}
#app {
  height: 100%;
  background-color: rgb(36, 36, 36);
}
</style>
