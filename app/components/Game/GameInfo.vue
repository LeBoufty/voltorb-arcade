<script setup lang="ts">
const { token } = defineProps<{
  token: string;
}>();
const asyncState = await useAsyncData("state", () =>
  $fetch(`/api/game/${token}/state`),
);
</script>

<template>
  <div
    class="game-info-bg game-info-color text-center text-6xl rounded-2xl mt-5 w-auto"
  >
    <div>
      <h1>Score : {{ asyncState.data.value?.state?.score }} pts.</h1>
    </div>
    <div v-if="asyncState.data.value?.state?.over">
      <h1 v-if="asyncState.data.value.state.score === 0">You lose !!!</h1>
      <h1 v-if="asyncState.data.value.state.score !== 0">You win !!!</h1>
    </div>
  </div>
</template>

<style>
.game-info-bg {
  background-color: var(--game-info-bg);
}

.game-info-color {
  color: var(--game-info-color);
}
</style>
