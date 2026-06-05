<script setup lang="ts">
const { mode } = defineProps<{
  mode: { mode: string };
}>();
</script>

<template>
  <div class="notepad-bg p-5 ml-8 rounded-3xl grid-cols-1 text-center">
    <h2 class="text-5xl">Mode</h2>
    <table>
      <tbody>
        <tr>
          <td colspan="2">
            <button
              class="two-cols mode-cell rounded-2xl"
              :class="{
                selected: mode.mode === 'select',
                unselected: mode.mode !== 'select',
              }"
              @click="mode.mode = 'select'"
            >
              SELECT
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button
              class="square mode-cell point-cell rounded-2xl"
              :class="{
                selected: mode.mode === 'x0',
                unselected: mode.mode !== 'x0',
              }"
              @click="mode.mode = 'x0'"
            >
              ●
            </button>
          </td>
          <td>
            <button
              class="square mode-cell rounded-2xl"
              :class="{
                selected: mode.mode === 'x1',
                unselected: mode.mode !== 'x1',
              }"
              @click="mode.mode = 'x1'"
            >
              1
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button
              class="square mode-cell rounded-2xl"
              :class="{
                selected: mode.mode === 'x2',
                unselected: mode.mode !== 'x2',
              }"
              @click="mode.mode = 'x2'"
            >
              2
            </button>
          </td>
          <td>
            <button
              class="square mode-cell rounded-2xl"
              :class="{
                selected: mode.mode === 'x3',
                unselected: mode.mode !== 'x3',
              }"
              @click="mode.mode = 'x3'"
            >
              3
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.notepad-bg {
  background-color: var(--notepad-bg);
}

.square {
  width: 64px;
  height: 64px;
}

.two-cols {
  padding: 0px 17px 10px 20px;
  width: inherit;
  height: 64px;
}

.selected {
  background-color: var(--selected-mode);
  color: var(--notepad-selected-text);
}

.unselected {
  background-color: var(--unselected-mode);
  color: var(--notepad-unselected-text);
}

.mode-cell {
  font-size: 32pt;
  font-family: "Jersey 10", sans-serif;
  margin: 2px;
}

.point-cell {
  padding-bottom: 8px;
}
</style>
