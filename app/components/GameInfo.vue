<script setup lang="ts">
const { token } = defineProps<{
  token: string;
}>();
const asyncState = await useAsyncData("state", () =>
  $fetch(`/api/game/${token}/state`),
);
</script>

<template>
  <div class="info-container">
    <div>
      <h1>Score : {{ asyncState.data.value?.state?.score }}</h1>
    </div>
    <div v-if="asyncState.data.value?.state?.over">
      <h1 v-if="asyncState.data.value.state.score === 0">You lose !!!</h1>
      <h1 v-if="asyncState.data.value.state.score !== 0">You win !!!</h1>
    </div>
  </div>
</template>

<style>
.info-container {
  display: grid;
  column-count: 1;
  align-items: center;
  justify-content: center;
  background-color: mediumseagreen;
}
</style>
