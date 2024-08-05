<template>
  <div :style="appStyles" class="app">
    <div class="container">
      <Header />
      <UserContent />
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { auth } from './useAuth';
import Header from './components/Header.vue';
import UserContent from './components/UserContent.vue';
import LoginForm from './components/LoginForm.vue';

const { isLoggedIn } = auth();

// Background change based on isLoggedIn
const appStyles = computed(() => {
  return {
    backgroundColor: isLoggedIn.value
      ? 'rgb(253, 239, 239)'
      : 'rgb(252, 243, 194)',
  };
});
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: rgb(252, 243, 194);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 820px;
  margin: 4rem auto;
}
</style>
