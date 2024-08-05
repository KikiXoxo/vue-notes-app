<template>
  <header>
    <h1 v-if="isLoggedIn">You are logged in, welcome {{ userName }}!</h1>
    <h1 v-else>You are logged out, please log in to continue</h1>
  </header>
</template>

<script setup>
import { auth } from '../useAuth';

const { isLoggedIn, userName } = auth();
</script>

<style scoped>
header {
  margin-bottom: 3.6rem;
}

h1 {
  font-size: 2.2rem;
  text-align: center;
}
</style>
