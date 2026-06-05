<script setup lang="ts">
import Game from "~/components/Game/Game.vue";
let token = "";
const { data } = await useFetch("/api/game/new/_Test5");
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
