<script setup lang="ts">
import { reactive } from "vue";
import Logo from "../components/Logo/index.vue";
import Button from "../components/Button/index.vue";
import FieldText from "../components/FieldText/index.vue";

const user = reactive({
  email: "",
  password: "",
});

const login = () => {
  console.log(user.email, user.password);
};
</script>

<template>
  <main class="grid grid-cols-2 min-h-[100vh] bg-white">
    <section class="flex justify-center items-center h-[100%]">
      <div
        class="flex justify-center h-[100%] items-center flex-col w-full"
      >
        <div class="mb-[100px] flex flex-col items-center">
          <h1 class="text-7xl font-bold text-blue-800">Welcome</h1>
          <span class="text-black font-medium"
            >Organize your life. Organize your mind.</span
          >
        </div>
        <form
          class="flex justify-center items-center flex-col w-full gap-5"
          @submit.prevent="login"
        >
          <FieldText
            id="email"
            type="text"
            placeholder="Type your email"
            label="Email"
            v-model="user.email"
          />
          <FieldText
            id="password"
            type="password"
            placeholder="Type your password"
            label="Password"
            v-model="user.password"
          />

          <span>
            If you do not have an account,
            <router-link
              class="text-blue-800 font-bold"
              to="/register"
              >Click here</router-link
            ></span
          >
          <Button text="Login" />
        </form>
      </div>
    </section>
    <section
      class="flex shadow-xl shadow-blue-800/100 items-center justify-center h-[100%] p-[100px] rounded-tl-[50px] rounded-bl-[50px] bg-[linear-gradient(to_right,_rgb(23,_45,_171),_rgb(31,_35,_66))]"
    >
      <Logo />
    </section>
  </main>
</template>
