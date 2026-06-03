<script setup lang="ts">
let token;
const { data } = await useFetch("/api/newgame/Vanilla1");
if (data.value?.token) {
  token = data.value.token;
}
</script>

<template>
  <Board :token="token" />
</template>
