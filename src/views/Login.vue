<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <main>
    <section>
      <h1>{{ msg }}</h1>
      <h1 class="text-3xl font-bold bg-zinc-950">Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>
    </section>
    <section>
      <img src="" alt="" />
    </section>
  </main>
</template>

<style scoped></style>
