<script setup lang="ts">
import { ButtonProps } from '../../types';

defineProps<ButtonProps>();

const emit = defineEmits(['click']);
</script>

<template>
   <button
      :class="{
         selectedStyle: isSelected,
         'border-red-800 shadow-lg shadow-red-500/25 bg-red-700 hover:text-red-800': error,
      }"
      class="p-4 max-w-[375px] bg-blue-800 text-white rounded-lg shadow-md shadow-blue-800/50 transition-all duration-300 ease-in-out hover:text-blue-800 border border-blue-800 hover:bg-white"
      @click="$emit('click')"
   >
      <slot></slot>
   </button>
</template>

<style scoped>
.selectedStyle {
   color: rgb(30 64 175);
   background-color: rgb(255 255 255);
}
</style>
