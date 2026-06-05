<script setup lang="ts">
import { RevealCommand } from "#imports";

const { line, column, token, state, mode } = defineProps<{
  line: number;
  column: number;
  token: string;
  state: { score: number; revealed: Coordinates[]; over: boolean };
  mode: { mode: string };
}>();

const x1 = ref(false);
const x2 = ref(false);
const x3 = ref(false);
const x0 = ref(false);
const clicked = ref(state.revealed.includes({ line, column }));
const value = ref("?");
const color = ref("safe");

async function click() {
  if (!clicked.value) {
    if (mode.mode === "select") {
      const fetchedValue = await reveal_spot();
      if (fetchedValue === 0) {
        color.value = "error";
      }
      value.value = fetchedValue!.toString();
      clicked.value = true;
      refreshNuxtData("state");
    } else if (mode.mode === "x0") {
      x0.value = !x0.value;
    } else if (mode.mode === "x1") {
      x1.value = !x1.value;
    } else if (mode.mode === "x2") {
      x2.value = !x2.value;
    } else if (mode.mode === "x3") {
      x3.value = !x3.value;
    }
  }
}

// On refresh, re-fetch the value if the spot was revealed
// Also reveal the spot if the game is over
async function reveal_board() {
  if (
    (clicked.value && value.value === "?") ||
    (state.over && !clicked.value)
  ) {
    const fetched = await reveal_spot();
    if (!clicked.value) {
      color.value = "gameover";
    }
    clicked.value = true;
    value.value = fetched!.toString();
  }
}

async function reveal_spot() {
  const command = new RevealCommand(line, column, token);
  const data = await command.execute();
  return data?.value;
}

await reveal_board();
watch(
  () => state.over,
  (newValue, _) => {
    if (newValue) reveal_board();
  },
  { deep: true },
);
</script>

<template>
  <button @click="click" v-if="!clicked" class="game-cell">
    <table>
      <tbody>
        <tr>
          <td class="checker-dark spot-td">
            <div class="value-marker" v-show="x0">●</div>
          </td>
          <td class="checker-light spot-td"></td>
          <td class="checker-dark spot-td">
            <div class="value-marker" v-show="x1">1</div>
          </td>
        </tr>
        <tr>
          <td class="checker-light spot-td"></td>
          <td class="checker-dark spot-td"></td>
          <td class="checker-light spot-td"></td>
        </tr>
        <tr>
          <td class="checker-dark spot-td">
            <div class="value-marker" v-show="x2">2</div>
          </td>
          <td class="checker-light spot-td"></td>
          <td class="checker-dark spot-td">
            <div class="value-marker" v-show="x3">3</div>
          </td>
        </tr>
      </tbody>
    </table>
  </button>
  <div
    class="revealed"
    :class="{
      safecell: color === 'safe',
      errorcell: color === 'error',
      gameovercell: color === 'gameover',
    }"
    v-else
  >
    <div class="revealed-value">
      <div v-if="value !== '0'">
        {{ value }}
      </div>
      <div v-else>
        <img class="voltorb-cell" src="/assets/img/board/voltorb.png" />
      </div>
    </div>
  </div>
</template>

<style>
.voltorb-cell {
  width: 47px;
  background-color: transparent;
  margin-left: 6px;
  margin-top: 11px;
}

.revealed-value {
  color: var(--revealed-value-text);
  font-size: 48px;
  text-align: center;
  margin-top: -5px;
}

.revealed {
  width: 63px;
  height: 63px;
  margin: 3px;
  border: 2px solid var(--revealed-border);
  font-weight: bolder;
}

.safecell {
  background-color: var(--revealed-safe);
}

.errorcell {
  background-color: var(--revealed-error);
}

.gameovercell {
  background-color: var(--revealed-over);
}

.game-cell {
  width: 63px;
  height: 63px;
  padding-left: 3px;
  margin: 3px;
  background-color: var(--checker-dark);
  border-color: var(--checker-light);
}

.game-cell:hover {
  box-shadow: 0 0 5px var(--cell-hover-glow);
}

.spot-td {
  width: 19px;
  height: 19px;
}

.value-marker {
  font-family: "Jersey 10", sans-serif;
  text-align: center;
  font-size: 8pt;
  color: var(--marker-color);
  font-weight: bolder;
}

.checker-light {
  background-color: var(--checker-light);
}

.checker-dark {
  background-color: var(--checker-dark);
}
</style>
