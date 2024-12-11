<script setup lang="ts">
import { reactive } from "vue";
import Logo from "../components/Logo/index.vue";
import Button from "../components/Button/index.vue";
import FieldText from "../components/FieldText/index.vue";

const user = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
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
        <h2 class="mb-[100px] text-7xl font-bold text-blue-800">
          Register
        </h2>

        <form
          class="flex justify-center items-center flex-col w-full gap-5"
          @submit.prevent="login"
        >
          <FieldText
            id="FullName"
            type="text"
            placeholder="Type your name"
            label="Full Name"
            v-model="user.fullName"
          />
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
          <FieldText
            id="confirmPassword"
            type="password"
            placeholder="Type your password again"
            label="Confirm Password"
            v-model="user.confirmPassword"
          />
          <span>
            If you have a registration,
            <router-link class="text-blue-800 font-bold" to="/"
              >Click here</router-link
            ></span
          >
          <Button text="Register" />
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
