<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import Modal from '../../../components/Modal/index.vue';
import { getUserById } from '../../../services/index.ts';
import Button from '../../../components/Button/index.vue';
import { useUserStore } from '../../../stores/UserStore.ts';
import FieldText from '../../../components/FieldText/index.vue';
import { formatDate, validateDate } from '../../../utils/date.ts';
import PriorityCard from '../../../components/PriorityCard/index.vue';
import TrashIcon from '../../../assets/trash.png';
import { CategoriesTypes, PriorityTypes, CardProps, UserTypes } from '../../../types/index.ts';

const props = defineProps<{
   open: boolean;
   openModal(e: boolean): void;
   selectedTask: CardProps | null;
}>();

const openDeleteModal = ref(false);

const emit = defineEmits(['close']);

const newTask = reactive({
   id: '',
   title: '',
   date: '',
   priority: '',
   description: '',
   category: '',
});

const error = reactive({
   title: false,
   date: false,
   priority: false,
   category: false,
   description: false,
});

const errorText = ref('');
const userStore = useUserStore();

const messageError = 'Sorry, invalid credentials. Please fix and try again!';

const validateFields = () => {
   error.title = newTask.title === '';
   error.priority = newTask.priority === '';
   error.date = !validateDate(newTask.date);
   error.description = newTask.description === '';
   error.category = newTask.category === '';

   if (Object.values(error).some((attribute: boolean) => attribute)) {
      return (errorText.value = messageError);
   }

   return (errorText.value = '');
};

watch(
   () => props.selectedTask,
   newTaskValue => {
      if (newTaskValue) {
         Object.assign(newTask, newTaskValue);
      } else {
         Object.assign(newTask, {
            title: '',
            date: '',
            priority: '',
            description: '',
            category: '',
         });
      }
   },
   { immediate: true },
);

const clearState = () => {
   newTask.priority = '';
   newTask.title = '';
   newTask.date = '';
   newTask.description = '';
   newTask.category = '';
};

const getBodyReq = (asyncUser: UserTypes) => {
   return props.selectedTask
      ? (asyncUser.tasks ?? []).map(task =>
           props.selectedTask && task.id === props.selectedTask.id
              ? { ...newTask, date: formatDate(newTask.date) }
              : task,
        )
      : [
           ...(asyncUser.tasks || []),
           { ...newTask, id: crypto.randomUUID(), date: formatDate(newTask.date) },
        ];
};

const onSaveTask = async () => {
   if (!openDeleteModal.value && validateFields() === messageError) return;

   if (!userStore.user.id) return;

   const asyncUser = await getUserById(userStore.user.id);

   const taskBody = openDeleteModal.value
      ? asyncUser.tasks.filter((task: CardProps) => task.id !== props.selectedTask?.id)
      : getBodyReq(asyncUser);

   try {
      const response = await fetch(`http://localhost:3001/users/${userStore.user.id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            ...userStore.user,
            tasks: taskBody,
         }),
      });

      const data = await response.json();
      userStore.setUser(data);
      openDeleteModal.value = false;
      clearState();
      emit('close');
   } catch (error) {
      console.error('Error:', error);
   }
};
</script>

<template>
   <Modal :open="open" @close="emit('close')">
      <div
         class="flex flex-col p-[30px] pl-[100px] pr-[100px] max-sm:pl-[20px] max-sm:pr-[20px] max-sm:gap-[20px]"
      >
         <h3 class="font-bold text-[32px] text-center mb-[20px]">
            {{ selectedTask ? 'Edit' : 'New Task' }}
         </h3>
         <div class="flex flex-col grid-cols-2 gap-[10px]">
            <FieldText
               id="title"
               type="text"
               placeholder="Type your title"
               label="Title"
               v-model="newTask.title"
               class="max-w-none"
               :error="error.title"
            />
            <FieldText
               id="description"
               type="textfield"
               placeholder="Type your description"
               label="Description"
               v-model="newTask.description"
               :isTextArea="true"
               :error="error.description"
            />
         </div>

         <div class="mt-[20px]">
            <h4>Choose the categories</h4>
            <div class="flex gap-[20px] mt-[10px] max-md:flex-col">
               <Button
                  v-for="(categorie, i) in CategoriesTypes"
                  :key="i"
                  class="min-w-[100px] p-[10px]"
                  :isSelected="newTask.category === categorie"
                  :error="error.category"
                  @click="(newTask.category = categorie), (error.category = false)"
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
                  :error="error.date"
               />
            </div>

            <button
               v-if="selectedTask"
               @click="openDeleteModal = true"
               class="flex items-center justify-center gap-2 mt-[20px] border rounded-md p-[10px] border-black w-full"
            >
               <img class="w-[30px]" :src="TrashIcon" alt="" />
               <span>Delete task</span>
            </button>

            <div class="mt-[20px]">
               <h4>What's the priority?</h4>
               <ul class="flex gap-[20px] mt-[15px]">
                  <PriorityCard
                     v-for="(priority, i) in PriorityTypes"
                     :key="i"
                     :priority="priority"
                     :isSelected="newTask.priority === priority"
                     @click="(newTask.priority = priority), (error.priority = false)"
                  />
               </ul>
               <span class="text-red-700 mt-[10px] w-full flex justify-center" v-if="error.priority"
                  >Please select priority!</span
               >
            </div>
            <div class="mt-[20px] flex gap-[20px]">
               <Button class="p-[10px] w-full" @click="emit('close')">Cancel</Button>
               <Button class="p-[10px] w-full" @click="onSaveTask">{{
                  selectedTask ? 'Edit' : 'Create'
               }}</Button>
            </div>
         </div>
      </div>
      <Modal :open="openDeleteModal" @close="openDeleteModal = false">
         <div class="p-[20px] h-[200px] flex flex-col justify-between gap-6">
            <p class="font-bold mt-10">Are you sure you want to delete the task?</p>
            <div class="flex gap-5">
               <Button class="p-[10px] w-full" @click="openDeleteModal = false">Cancel</Button>
               <Button class="p-[10px] w-full" @click="onSaveTask">Delete</Button>
            </div>
         </div>
      </Modal>
   </Modal>
</template>
