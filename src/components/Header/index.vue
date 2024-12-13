<script setup lang="ts">
import Logo from '../../assets/bextLogo.png';
import User from '../../assets/user.svg';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/UserStore';

const router = useRouter();
const { user } = useUserStore();

const loggout = () => {
   localStorage.removeItem('logged');
   router.push('/');
};
</script>

<template>
   <header class="flex justify-between p-[30px]">
      <div class="flex items-center">
         <img :src="Logo" alt="" class="w-[100px] h-[100px]" />
         <h3 class="text-blue-800 font-bold text-[32px]">bext</h3>
      </div>
      <div class="flex flex-col items-center">
         <h2 class="font-bold text-[32px] mb-2">Welcome, {{ user.fullName.split(' ')[0] }}!</h2>
         <span class="font-medium text-[18px] text-black"
            >Organize your life. Organize your mind.</span
         >
      </div>
      <div class="flex gap-[13px] items-center h-[90px]">
         <span>{{ user.fullName.split(' ')[0] }}</span>
         <span
            class="absolute top-[5px] right-[15px] font-bold text-blue-800 cursor-pointer"
            @click="loggout"
            >Sign out</span
         >
         <button>
            <img :src="User" alt="Icon user" />
         </button>
      </div>
   </header>
</template>
