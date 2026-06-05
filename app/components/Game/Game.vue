<script setup lang="ts">
import Board from "./Board.vue";
import Notepad from "./Notepad.vue";
import Pet from "./Pet.vue";

const { token } = defineProps<{
  token: string;
}>();

const mode = ref({ mode: "select" });

const asyncState = await useAsyncData("state", () =>
  $fetch(`/api/game/${token}/state`),
);
</script>

<template>
  <div
    class="game-bg w-fit grid-cols-2 justify-center p-10 rounded-4xl pixel-text"
  >
    <table>
      <tbody>
        <tr>
          <td>
            <div class="board-wrapper">
              <Board
                :token="token"
                :state="asyncState.data.value?.state!"
                :mode="mode"
              />
            </div>
          </td>
          <td>
            <Pet />
            <Notepad :mode="mode" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="game-info-wrapper"><GameInfo :token="token" /></div>
  </div>
</template>

<style>
.game-bg {
  background-color: var(--game-bg);
}

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
