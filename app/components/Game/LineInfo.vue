<script setup lang="ts">
import type { LineInformation } from "~~/server/utils/Board";

const { info } = defineProps<{
  info: LineInformation;
}>();
</script>

<template>
  <div class="mt-0.5 ml-1">
    <div class="voltorb info rounded-t-lg">{{ info.voltorbs }}</div>
    <div class="points info rounded-b-lg">{{ info.points }} pts</div>
  </div>
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
  background-color: var(--voltorb-count-bg);
  color: var(--voltorb-count-text);
}
.points {
  background-color: var(--points-count-bg);
  color: var(--points-count-text);
}
</style>
