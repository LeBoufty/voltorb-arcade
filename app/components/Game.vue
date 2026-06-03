<script setup lang="ts">
import Board from "./Board.vue";

const { token } = defineProps<{
  token: string;
}>();

const asyncState = await useAsyncData("state", () =>
  $fetch(`/api/game/${token}/state`),
);
const revealed = asyncState.data.value?.state?.revealed;
</script>

<template>
  <Board :token="token" :revealed="revealed" />
  <h1>Score : {{ asyncState.data.value!.state!.score }}</h1>
</template>
