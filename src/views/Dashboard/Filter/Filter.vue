<script setup lang="ts">
import XMark from '../../../assets/x-mark.webp';
import Filter from '../../../assets/filter.svg';
import { PriorityTypes } from '../../../types/index.ts';
import Button from '../../../components/Button/index.vue';
import { useFilterStore } from '../../../stores/FilterStore';
import Checkbox from '../../../components/Checkbox/Checkbox.vue';
import PriorityCard from '../../../components/PriorityCard/index.vue';

defineProps<{ openModal(): void; onOpenFilter(e: boolean): void; openFilter: boolean }>();

const filterStore = useFilterStore();

const handlePriority = (priority: string) => {
   if (filterStore.priority === priority) return (filterStore.priority = '');
   return (filterStore.priority = priority);
};

const toggleCategory = (category: string, isChecked: boolean) => {
   const index = filterStore.category.indexOf(category);
   if (isChecked && index === -1) {
      return filterStore.category.push(category);
   }

   if (!isChecked && index !== -1) {
      return filterStore.category.splice(index, 1);
   }
};
</script>

<template>
   <div class="flex gap-[30px] relative">
      <button @click="onOpenFilter(!openFilter)" class="bottom-[0px]">
         <img :src="Filter" alt="filter icon" />
      </button>
      <Button class="w-12 p-[8px] max-md:p-[0px]" @click="openModal()">+</Button>
      <div
         v-if="openFilter"
         class="flex z-20 shadow-lg shadow-blue-500/25 flex-col absolute gap-[13px] top-[50px] right-[80px] items-start p-[20px] bg-white"
      >
         <button
            @click="onOpenFilter(!openFilter)"
            class="w-[25px] h-[25px] absolute top-[10px] right-[10px]"
         >
            <img :src="XMark" alt="icon close modal" />
         </button>
         <div class="flex flex-col gap-[5px]">
            <Checkbox
               id="personal-filter"
               label="Personal"
               :modelValue="filterStore.category.includes('Personal')"
               value="personal"
               @change="isChecked => toggleCategory('Personal', isChecked)"
            />
            <Checkbox
               id="work-filter"
               label="Work"
               :modelValue="filterStore.category.includes('Work')"
               value="work"
               @change="isChecked => toggleCategory('Work', isChecked)"
            />
            <Checkbox
               id="study-filter"
               label="Study"
               :modelValue="filterStore.category.includes('Study')"
               value="study"
               @change="isChecked => toggleCategory('Study', isChecked)"
            />
         </div>
         <div class="mt-[10px]">
            <h4 class="font-bold">What's the priority?</h4>
            <ul class="flex gap-[20px] mt-[15px]">
               <PriorityCard
                  v-for="(priority, i) in PriorityTypes"
                  :key="i"
                  :priority="priority"
                  :isSelected="filterStore.priority === priority"
                  @click="handlePriority(priority)"
               />
            </ul>
         </div>
      </div>
   </div>
</template>
