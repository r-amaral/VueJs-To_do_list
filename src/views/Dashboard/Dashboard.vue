<script setup lang="ts">
import Header from "../../components/Header/index.vue";
import { useUserStore } from "../../stores/UserStore.ts";
import Card from "../../components/Card/index.vue";
import Button from "../../components/Button/index.vue";
import PriorityCard from "../../components/PriorityCard/index.vue";
import Modal from "../../components/Modal/index.vue";
import FieldText from "../../components/FieldText/index.vue";
import { reactive, ref } from "vue";
import { CategoriesTypes, PriorityTypes } from "../../types/index.ts";

const open = ref(false);
const userStore = useUserStore();

const newTask = reactive({
  title: "",
  date: "",
  priority: "",
  description: "",
  category: "",
});

const openModal = (state: boolean) => (open.value = state);
</script>

<template>
  <Header />

  <main class="w-full flex justify-center">
    <section class="w-[70%]">
      <div class="w-full mb-[10px] flex justify-between">
        <h3>Tasks</h3>
        <Button class="w-[135px] p-[8px]" @click="openModal(true)">
          New task</Button
        >
      </div>
      <ul
        v-if="userStore.user.tasks?.length"
        class="flex p-[30px] flex-col gap-[20px] w-full items-center border rounded-lg border-blue-800"
      >
        <Card
          v-for="(task, index) in userStore.user.tasks"
          :key="index"
          :date="task.date"
          :title="task.title"
          :priority="task.priority"
        />
      </ul>
    </section>

    <Modal :open="open" @close="openModal(false)">
      <div class="flex flex-col p-[30px]">
        <h3 class="font-bold text-[40px] text-center mb-[20px]">
          New Task
        </h3>
        <div class="flex flex-col grid-cols-2 gap-[10px]">
          <FieldText
            id="title"
            type="text"
            placeholder="Type your title"
            label="Title"
            v-model="newTask.title"
            class="max-w-none"
          />
          <FieldText
            id="description"
            type="textfield"
            placeholder="Type your description"
            label="Description"
            v-model="newTask.description"
            :isTextArea="true"
          />
        </div>

        <div class="mt-[20px]">
          <h4>Choose the categories</h4>
          <div class="flex gap-[20px] mt-[10px]">
            <Button
              v-for="(categorie, i) in CategoriesTypes"
              :key="i"
              class="min-w-[100px] p-[10px]"
              :class="
                newTask.category === categorie &&
                'text-blue-700 bg-white'
              "
              @click="newTask.category = categorie"
              >{{ categorie }}</Button
            >
          </div>

          <div class="mt-[20px]">
            <h4>DeadLine:</h4>
            <FieldText
              id="date"
              type="date"
              placeholder="Type your description"
              v-model="newTask.date"
            />
          </div>

          <div class="mt-[20px]">
            <h4>What's the priority?</h4>
            <ul class="flex gap-[20px] mt-[15px]">
              <PriorityCard
                v-for="(priority, i) in PriorityTypes"
                :key="i"
                :priority="priority"
                :isSelected="newTask.priority === priority"
                @click="newTask.priority = priority"
              />
            </ul>
          </div>

          {{ console.log(newTask.priority) }}
          <div class="mt-[20px] flex gap-[20px]">
            <Button class="p-[10px]" @click="openModal(false)"
              >Cancel</Button
            >
            <Button class="p-[10px]">Create</Button>
          </div>
        </div>
      </div>
    </Modal>
  </main>
</template>
