<script setup lang="ts">
let token = "";
const { data } = await useFetch("/api/game/new/Vanilla1");
if (data.value?.token) {
  token = data.value.token;
}
</script>

<template>
  <head>
    <title>Game - Voltorb Arcade</title>
  </head>
  <Game :token="token" />
</template>
