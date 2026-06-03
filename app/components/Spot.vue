<script setup lang="ts">
import { RevealCommand } from "#imports";

const props = defineProps({
  line: { type: Number, required: true },
  column: { type: Number, required: true },
  token: { type: String, required: true },
});

async function click() {
  if (!clicked.value) {
    const command = new RevealCommand(props.line, props.column, props.token);
    const data = await command.execute();
    clicked.value = true;
    if (data?.active) {
      value.value = data.value!.toString();
    }
  }
}

const x1 = ref(false);
const x2 = ref(false);
const x3 = ref(false);
const x0 = ref(false);
const clicked = ref(false);
const value = ref("?");
</script>

<template>
  <button @click="click" v-if="!clicked">
    <table>
      <tbody>
        <tr>
          <td class="checker-dark spot-td">
            <div class="marker" v-show="x0">O</div>
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
    <div class="revealed-value">{{ value }}</div>
  </div>
</template>

<style>
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

button {
  width: 63px;
  height: 63px;
  padding: 0px;
  background-color: green;
  border-color: seagreen;
}

button:hover {
  box-shadow: 0 0 5px white;
}

.spot-td {
  width: 15px;
  height: 15px;
}

.marker {
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
