<script setup lang="ts">
import { CheckBoxProps } from '../../types';

defineProps<CheckBoxProps>();

const emit = defineEmits(['change']);

const handleChange = (event: Event) => {
   emit('change', (event.target as HTMLInputElement)?.checked);
};
</script>

<template>
   <div class="flex flex-row gap-1">
      <input
         class="rounded-lg p-4 border w-[20px] h-[20px] border-black shadow-lg shadow-blue-500/25 bg-transparent text-black placeholder:text-gray-500 max-w-[375px]"
         type="checkbox"
         :id="id"
         :checked="modelValue"
         @change="handleChange"
      />
      <label class="text-black font-medium" :for="id">{{ label }}</label>
   </div>
</template>
