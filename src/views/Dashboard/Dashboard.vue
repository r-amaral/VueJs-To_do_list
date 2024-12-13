<script setup lang="ts">
import { ref, computed } from 'vue';
import Filter from './Filter/Filter.vue';
import { CardProps } from '../../types/index.ts';
import TaskModal from './TaskModal/TaskModal.vue';
import Card from '../../components/Card/index.vue';
import Header from '../../components/Header/index.vue';
import { useUserStore } from '../../stores/UserStore.ts';
import { useFilterStore } from '../../stores/FilterStore';

const open = ref(false);
const openFilter = ref(false);
const userStore = useUserStore();
const filterStore = useFilterStore();

const selectedTask = ref<CardProps | null>(null);

const setModalState = (isOpen: boolean, task: CardProps | null = null) => {
   open.value = isOpen;
   selectedTask.value = task;
};

const openModal = () => setModalState(true);
const openEditModal = (currentTask: CardProps) => setModalState(true, currentTask);
const closeModal = () => setModalState(false);
const onOpenFilter = (status: boolean) => (openFilter.value = status);

const filteredTasks = computed(() => {
   return userStore.user.tasks?.filter(task => {
      const matchesCategory =
         filterStore.category.length === 0 || filterStore.category.includes(task.category);
      const matchesPriority = !filterStore.priority || filterStore.priority === task.priority;
      return matchesCategory && matchesPriority;
   });
});
</script>

<template>
   <Header />
   <main class="w-full flex justify-center">
      <section class="w-[70%]">
         <div class="w-full flex justify-between">
            <h3 class="text-[32px] font-bold">My Board</h3>
            <Filter :openModal="openModal" :openFilter="openFilter" :onOpenFilter="onOpenFilter" />
         </div>
         <ul
            v-if="filteredTasks?.length ?? 0"
            class="flex p-[30px] flex-col gap-[20px] w-full items-center"
         >
            <Card
               v-for="(task, index) in filteredTasks"
               :key="index"
               :date="task.date"
               :title="task.title"
               :priority="task.priority"
               @click="openEditModal(task)"
            />
         </ul>
      </section>

      <TaskModal
         :open="open"
         @close="closeModal"
         :openModal="openModal"
         :selectedTask="selectedTask"
      />
   </main>
</template>
