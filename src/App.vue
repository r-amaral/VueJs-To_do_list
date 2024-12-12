<script setup lang="ts">
import { RouterView } from "vue-router";
import { watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const checkRoute = (path: string) => {
  const user = localStorage.getItem("logged");

  if (user && path !== "/dashboard") {
    router.push("/dashboard");
  }

  if (!user && path === "/dashboard") {
    router.push("/");
  }
};

onMounted(() => {
  checkRoute(router.currentRoute.value.path);
});

watch(
  () => router.currentRoute.value.path,
  (newPath, _) => {
    checkRoute(newPath);
  }
);
</script>

<template>
  <router-view />
</template>

<style scoped></style>
