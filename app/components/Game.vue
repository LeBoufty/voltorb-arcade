<script setup lang="ts">
import Board from "./Board.vue";

const { token } = defineProps<{
  token: string;
}>();

const mode = ref({ mode: "select" });

const asyncState = await useAsyncData("state", () =>
  $fetch(`/api/game/${token}/state`),
);
const revealed = asyncState.data.value?.state?.revealed!;
</script>

<template>
  <table>
    <tbody>
      <tr>
        <td>
          <div class="board-wrapper">
            <Board :token="token" :revealed="revealed" :mode="mode" />
          </div>
        </td>
        <td><Notepad :mode="mode" /></td>
      </tr>
      <tr>
        <td>
          <div class="game-info-wrapper"><GameInfo :token="token" /></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.game-container {
  display: flex;
  column-count: 2;
  grid: auto-flow dense / 40px 40px 1fr;
}

.board-wrapper {
  grid-area: b;
}

.game-info-wrapper {
  grid-area: a;
}
</style>
