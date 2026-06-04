<script setup lang="ts">
import { RevealCommand } from "#imports";

const { line, column, token, wasclicked, mode } = defineProps<{
  line: number;
  column: number;
  token: string;
  wasclicked: boolean;
  mode: { mode: string };
}>();

const x1 = ref(false);
const x2 = ref(false);
const x3 = ref(false);
const x0 = ref(false);
const clicked = ref(wasclicked);
const value = ref("?");

async function click() {
  if (!clicked.value) {
    if (mode.mode === "select") {
      const command = new RevealCommand(line, column, token);
      const data = await command.execute();
      clicked.value = true;
      if (data?.active) {
        value.value = data.value!.toString();
      }
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
</script>

<template>
  <button @click="click" v-if="!clicked" class="game-cell">
    <table>
      <tbody>
        <tr>
          <td class="checker-dark spot-td">
            <div class="marker" v-show="x0">●</div>
          </td>
          <td class="checker-light spot-td"></td>
          <td class="checker-dark spot-td">
            <div class="marker" v-show="x1">1</div>
          </td>
        </tr>
        <tr>
          <td class="checker-light spot-td"></td>
          <td class="checker-dark spot-td"></td>
          <td class="checker-light spot-td"></td>
        </tr>
        <tr>
          <td class="checker-dark spot-td">
            <div class="marker" v-show="x2">2</div>
          </td>
          <td class="checker-light spot-td"></td>
          <td class="checker-dark spot-td">
            <div class="marker" v-show="x3">3</div>
          </td>
        </tr>
      </tbody>
    </table>
  </button>
  <div class="revealed" v-else>
    <div class="revealed-value">
      <div v-if="value !== '0'">
        {{ value }}
      </div>
      <div v-else>
        <img class="voltorb" src="/assets/img/board/voltorb.png" />
      </div>
    </div>
  </div>
</template>

<style>
.voltorb {
  width: 51px;
  background-color: transparent;
}

.revealed-value {
  color: black;
  font-size: 48px;
  text-align: center;
  margin-top: 4px;
}

.revealed {
  width: 59px;
  height: 59px;
  border: 2px solid saddlebrown;
  background-color: beige;
  font-weight: bolder;
}

.game-cell {
  width: 63px;
  height: 63px;
  padding: 0px;
  background-color: green;
  border-color: seagreen;
}

.game-cell:hover {
  box-shadow: 0 0 5px white;
}

.spot-td {
  width: 15px;
  height: 15px;
}

.marker {
  font-family: "Jersey 10", sans-serif;
  text-align: center;
  font-size: 8pt;
  color: yellow;
  font-weight: bolder;
}

.checker-light {
  background-color: seagreen;
}

.checker-dark {
  background-color: green;
}
</style>
