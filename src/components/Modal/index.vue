<script setup lang="ts">
import XMark from '../../assets/x-mark.webp';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits(['close']);

const onClose = () => {
   emit('close');
};
</script>

<template>
   <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
   >
      <div
         v-if="props.open"
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-[100vw] h-[100vh]"
      >
         <div
            class="min-w-[10%] min-h-[10%] max-w-[80%] max-h-[90%] rounded-xl bg-white relative overflow-auto"
         >
            <button @click="onClose" class="w-[30px] h-[30px] absolute top-[10px] right-[20px]">
               <img :src="XMark" alt="icon close modal" />
            </button>
            <slot></slot>
         </div>
      </div>
   </transition>
</template>
