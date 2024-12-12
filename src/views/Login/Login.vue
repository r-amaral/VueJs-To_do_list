<script setup lang="ts">
import { reactive } from "vue";
import Logo from "../../components/Logo/index.vue";
import Button from "../../components/Button/index.vue";
import FieldText from "../../components/FieldText/index.vue";
import { useRouter } from "vue-router";
import { UserTypes, UserLoginTypes } from "../../types/index.ts";
import { useUserStore } from "../../stores/UserStore.ts";

const user = reactive({
  email: "",
  password: "",
} as UserLoginTypes);

const router = useRouter();
const userStore = useUserStore();

const onLogin = async () => {
  try {
    const response = await fetch("http://localhost:3001/users");
    const users = await response.json();

    const foundUser = users.find((userList: UserTypes) => {
      if (
        userList.email === user.email &&
        userList.password === user.password
      )
        return userList;
    });

    if (foundUser) {
      userStore.setUser(foundUser);
      router.push("/dashboard");
      localStorage.setItem("logged", JSON.stringify(foundUser));
    }
  } catch (error) {
    throw Error(`Error logging in: ${error}`);
  }
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
          @submit.prevent="onLogin"
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
          <Button>Login</Button>
        </form>
      </div>
    </section>
    <Logo />
  </main>
</template>
