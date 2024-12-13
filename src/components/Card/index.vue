<script setup lang="ts">
import { CardProps } from '../../types';

const props = defineProps<CardProps>();

const { title, date, priority } = props;

const getCardColor = (priority: string) => {
   switch (priority) {
      case 'High':
         return {
            card: 'border-red-500 shadow-red-500/25',
            tag: 'bg-red-500',
         };
      case 'Medium':
         return {
            card: 'border-yellow-500 shadow-yellow-500/25',
            tag: 'bg-yellow-500',
         };
      case 'Low':
         return {
            card: 'border-green-500 shadow-green-500/25',
            tag: 'bg-green-500',
         };
      default:
         return null;
   }
};

const cardColor = getCardColor(priority);
</script>

<template>
   <li
      class="cursor-pointer relative rounded-lg h-[100px] border flex justify-between w-full shadow-lg bg-transparent text-black max-w-[500px]"
      :class="cardColor?.card"
   >
      <div class="flex flex-col items-center justify-between p-[16px]">
         <span class="font-bold text-[20px] text-black">{{ title }}</span>
         <span class="text-[20px] text-black">{{ date }}</span>
      </div>
      <div
         class="w-[100px] rounded-bl-xl p-[10px] absolute right-0 top-0 flex justify-center"
         :class="cardColor?.tag"
      >
         <span class="text-[14px] text-white font-bold">{{ priority }}</span>
      </div>
   </li>
</template>
