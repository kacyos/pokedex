<script setup>
import Home from "./pages/home.vue";
import "./style.css";
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
