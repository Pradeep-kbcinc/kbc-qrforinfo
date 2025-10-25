<template>
   <Transition name="slide-fade" mode="out-in">
    <div v-if="show" class="full-layout">
  <v-main>
    <Header />
    <router-view />
    <Sidebar />
  </v-main>
  </div>
  </Transition>
</template>

<script setup>
import Header from './header.vue'
import Sidebar from './sidebar.vue'
const show = ref(false)

onMounted(() => {
  setTimeout(() => (show.value = true), 100)
})
</script>
