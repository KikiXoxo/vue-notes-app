'use strict';

import { ref } from 'vue';
const isLoggedIn = ref(false);
const userName = ref('');
const auth = function () {
  const logIn = name => {
    userName.value = name;
    isLoggedIn.value = true;
  };

  const logOut = () => {
    isLoggedIn.value = false;
    userName.value = '';
  };

  return { isLoggedIn, userName, logIn, logOut }; // auth returns an object with these properties;
};

export { auth };
