<script setup lang="ts">
import { ButtonProps } from "../../types";

defineProps<ButtonProps>();

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    class="w-full p-4 max-w-[375px] bg-blue-800 text-white rounded-lg shadow-md shadow-blue-800/50"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>
