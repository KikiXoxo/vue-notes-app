<template>
  <div v-if="!isLoggedIn" class="login-form">
    <div class="form-item">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model.trim="name"
        name="name"
        maxlength="25"
        required
      />
    </div>

    <div class="form-item">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model.trim="email"
        name="email"
        maxlength="50"
        required
      />
    </div>

    <button @click="logInUser">Log In</button>
  </div>

  <div v-else>
    <button @click="logOutUser" class="logout">Log Out</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../useAuth';

const { isLoggedIn, logIn, logOut } = auth();
const name = ref('');
const email = ref('');

const logInUser = () => {
  logIn(name.value);
};

const logOutUser = () => {
  logOut();
  name.value = '';
  email.value = '';
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 80%;
}

.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  width: 80%;
}

.form-item label {
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.form-item input {
  font-family: 'Inter', sans-serif;
  border: 1px solid #999;
  margin-top: 5px;
  border-radius: 5px;
  height: 35px;
  padding: 0 10px;
  transition: all 200ms;
  font-size: 14px;
}

.form-item input:focus {
  background: rgba(255, 252, 238, 0.918);
}

button {
  cursor: pointer;
  text-decoration: none;

  font-size: 14px;
  width: 80%;
  border: none;
  /* border-radius: 10px; */
  padding: 0.5rem 1rem;
  background-color: #222;
  color: #f8f8f8;
  /* justify-self: center; */
  transition: opacity 200ms ease-in-out;
  margin-top: 5px;
}
button:hover {
  opacity: 0.95;
}

button.logout {
  width: 150px;
}
</style>
