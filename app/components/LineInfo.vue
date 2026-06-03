<script setup lang="ts">
import type { LineInformation } from "~~/server/utils/Board";

const { info } = defineProps<{
  info: LineInformation;
}>();
</script>

<template>
  <div class="voltorb info">{{ info.voltorbs }}</div>
  <div class="points info">{{ info.points }} pts</div>
</template>

<style>
.info {
  height: 31px;
  width: 63px;
  font-size: 20pt;
  font-weight: bolder;
  text-align: center;
}
.voltorb {
  margin-bottom: 1px;
  background-color: darkred;
  color: white;
}
.points {
  background-color: lightgray;
  color: darkslategray;
}
</style>
