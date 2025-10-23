<template>
<Login/>
</template>
<script setup>
import Login from '~/components/Login.vue';
definePageMeta({
  layout: 'auth' // looks for layouts/auth.vue
})
</script>