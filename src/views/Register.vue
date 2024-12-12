<script setup lang="ts">
import { reactive, ref } from "vue";
import Logo from "../components/Logo/index.vue";
import Button from "../components/Button/index.vue";
import FieldText from "../components/FieldText/index.vue";
import { UserTypes, UserErrorTypes } from "../types";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
} as UserTypes);

const error = reactive({
  fullName: false,
  email: false,
  password: false,
  confirmPassword: false,
} as UserErrorTypes);

const errorText = ref("");

const errorType = {
  incorrectCredentials:
    "Sorry, invalid credentials. Please fix and try again!",
  existingEmail:
    "Sorry, that email has already been registered. Try another email!",
};

const validateFields = () => {
  const regEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const regName = /^([A-Za-z\u00C0-\u017F´]\s?){3,40}$/g;
  const regStrongPassword =
    /^(?=.*[A-Z])(?=.*[\W|_])(?=.*[0-9])(?=.*[a-z]).{6,}$/;

  error.fullName = !regName.test(user.fullName);
  error.email = !regEmail.test(user.email);
  error.password = !regStrongPassword.test(user.password);
  error.confirmPassword = user.confirmPassword !== user.password;

  if (Object.values(error).some((attribute: boolean) => attribute)) {
    return (errorText.value = errorType.incorrectCredentials);
  }

  return (errorText.value = "");
};

const validateExistingEmail = async () => {
  return fetch("http://localhost:3001/users")
    .then((response) => response.json())
    .then((data) => {
      const existingEmail = data.find(
        (userList: UserTypes) => userList.email === user.email
      );
      if (existingEmail) {
        error.email = true;
        errorText.value = errorType.existingEmail;
      }
    })
    .catch((error) => {
      throw new Error(`Error validating email: ${error}`);
    });
};

const onRegister = async () => {
  if (validateFields() === errorType.incorrectCredentials) return;

  await validateExistingEmail();

  if (errorText.value === errorType.existingEmail) return;

  try {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error("Error registering user.");
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
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
          @submit.prevent="onRegister"
        >
          <FieldText
            id="FullName"
            type="text"
            placeholder="Type your name"
            label="Full Name"
            v-model="user.fullName"
            :error="error.fullName"
          />
          <FieldText
            id="email"
            type="text"
            placeholder="Type your email"
            label="Email"
            v-model="user.email"
            :error="error.email"
          />
          <FieldText
            id="password"
            type="password"
            placeholder="Type your password"
            label="Password"
            v-model="user.password"
            :error="error.password"
          />
          <FieldText
            id="confirmPassword"
            type="password"
            placeholder="Type your password again"
            label="Confirm Password"
            v-model="user.confirmPassword"
            :error="error.confirmPassword"
          />
          <span>
            If you have a registration,
            <router-link class="text-blue-800 font-bold" to="/"
              >Click here</router-link
            ></span
          >
          <span v-if="!!errorText" class="text-black font-medium">{{
            errorText
          }}</span>
          <Button text="Register" />
        </form>
      </div>
    </section>
    <Logo />
  </main>
</template>
