<script setup lang="ts">
import { ButtonProps } from "../../types";

defineProps<ButtonProps>();

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    class="w-full p-4 max-w-[375px] bg-blue-800 text-white rounded-lg shadow-md shadow-blue-800/50 transition-all duration-300 ease-in-out hover:text-blue-800 border border-blue-800 hover:bg-white"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
