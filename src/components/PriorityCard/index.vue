<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  priority: string;
  isSelected: boolean;
}>();
const { priority, isSelected } = props;

const getCardColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-500 border-red-500 ";
    case "Medium":
      return "bg-yellow-500 border-yellow-500 ";
    case "Low":
      return "bg-green-500 border-green-500 ";
    default:
      return null;
  }
};
const cardColor = getCardColor(priority);
</script>

<template>
  <li
    class="cursor-pointer flex flex-col items-center w-full max-w-[500px] group"
  >
    <span
      class="w-[45px] h-[45px] rounded-full mb-2 border transition-all duration-300 ease-in-out group-hover:bg-white"
      :class="[isSelected ? 'bg-white' : '', cardColor]"
    ></span>
    <span>{{ priority }}</span>
  </li>
</template>
