<script setup lang="ts">
import type { LineInformation } from "~~/server/utils/Board";
import Spot from "./Spot.vue";

const { token } = defineProps<{
  token: string;
}>();

let size = 0;
let columns: LineInformation[] = [];
let lines: LineInformation[] = [];

const { data } = await useFetch(`/api/boardinfo/${token}`);
if (data.value?.information) {
  size = data.value.information.columns.length;
  columns = data.value.information.columns;
  lines = data.value.information.lines;
}
</script>

<template>
  <table>
    <tbody>
      <tr v-for="(line_info, l) in lines">
        <td v-for="(, c) in columns">
          <Spot :line="l" :column="c" :token="token" />
        </td>
        <td><LineInfo :info="line_info" /></td>
      </tr>
      <tr>
        <td v-for="column_info in columns">
          <LineInfo :info="column_info" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
td {
  color: black;
}
</style>
