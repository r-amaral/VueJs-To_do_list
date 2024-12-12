<script setup lang="ts">
import Logo from "../../assets/bextvc_logo-removebg-preview_1.png";
</script>

<template>
  <section
    class="flex shadow-xl shadow-blue-800/100 items-center justify-center h-[100%] p-[100px] rounded-tl-[50px] rounded-bl-[50px] bg-[linear-gradient(to_right,_rgb(23,_45,_171),_rgb(31,_35,_66))]"
  >
    <div class="flex items-center ml-[-42px]">
      <img :src="Logo" alt="Logo Bext" class="w-[120px] h-[100px]" />
      <span class="text-[78px] font-bold text-white">bext</span>
    </div>
  </section>
</template>
