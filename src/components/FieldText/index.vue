<script setup lang="ts">
defineProps<{
  type: string;
  placeholder: string;
  modelValue: string | number;
  label: string;
  id: string;
}>();
</script>

<template>
  <div class="w-full flex flex-col max-w-[375px] gap-1">
    <label class="text-black font-medium" :for="id">{{
      label
    }}</label>
    <input
      class="rounded-lg p-4 border border-black w-full shadow-lg shadow-blue-500/25 bg-transparent text-black placeholder:text-gray-500 max-w-[375px]"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value
        )
      "
    />
  </div>
</template>
