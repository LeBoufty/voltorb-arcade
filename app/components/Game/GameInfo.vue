<script setup lang="ts">
const { token } = defineProps<{
  token: string;
}>();
const asyncState = await useAsyncData("state", () =>
  $fetch(`/api/game/${token}/state`),
);

function quit() {}
</script>

<template>
  <div
    class="game-info-bg game-info-color text-center flex flex-col justify-center items-center text-6xl rounded-2xl mt-5 w-auto"
  >
    <div class="w-full">
      <h1>Score : {{ asyncState.data.value?.state?.score }} pts.</h1>
    </div>
    <div
      class="flex flex-col justify-center h-60 w-lg my-5 rounded-4xl result-bg"
    >
      <div v-if="asyncState.data.value?.state?.over">
        <h1 v-if="asyncState.data.value.state.score === 0">You lose !!!</h1>
        <h1 v-if="asyncState.data.value.state.score !== 0">You win !!!</h1>
      </div>
      <div v-else>
        <button class="quit-button py-4 px-12 rounded-2xl" @click="quit">
          Quit
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.quit-button {
  background-color: var(--quit-button);
}
.quit-button:hover {
  background-color: var(--quit-button-hover);
}
.quit-button:focus {
  background-color: var(--quit-button-pressed);
}

.result-bg {
  background-color: var(--result-bg);
}

.game-info-bg {
  background-color: var(--game-info-bg);
}

.game-info-color {
  color: var(--game-info-color);
}
</style>
