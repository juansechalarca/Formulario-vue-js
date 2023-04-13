<script setup>

import Test from './components/Test.vue'
</script>

<template>
   <Test/>
</template>


<style lang="postcss">
html,
body,
#app {
  @apply h-full ;
 
}

#app{
   @apply bg-[url('@/assets/fondo.jpg')] bg-cover bg-no-repeat bg-bottom bg-fixed
}
</style>