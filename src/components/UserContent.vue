<template>
  <div v-if="isLoggedIn" class="user-content">
    <div class="notes-header">
      <h2>Notes</h2>
      <button @click="showModal = true">+</button>
    </div>

    <div v-if="showModal" class="overlay">
      <div class="modal">
        <textarea
          v-model.trim="newNote"
          name="note"
          id="note"
          cols="30"
          rows="10"
        ></textarea>

        <p v-if="errorMessage">{{ errorMessage }}</p>
        <button @click="addNote">Add Note</button>
        <button class="close" @click="closeNote">Close</button>
      </div>
    </div>

    <div class="notes-container" :style="appStyles">
      <!-- Dynamically created notes -->
      <div
        v-for="note of notes"
        :key="note.id"
        :style="{ backgroundColor: note.backgroundColor }"
        class="note"
      >
        <p class="main-text">{{ note.text }}</p>
        <p class="date">{{ note.date.toLocaleDateString('en-US') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { auth } from '../useAuth';

const { isLoggedIn } = auth();

const showModal = ref(false); // default
const newNote = ref('');
const errorMessage = ref('');
const notes = ref([]);

// Return to default values
const closeNote = () => {
  showModal.value = false;
  newNote.value = '';
  errorMessage.value = '';
};

const getRandomColor = () => {
  return `hsl(${Math.random() * 360}, 100%, 75%)`;
};

const addNote = () => {
  if (newNote.value.length < 10)
    return (errorMessage.value = 'Note needs to be 10 characters or more'); // Guard clause

  notes.value.push({
    id: Math.floor(Math.random() * 100000),
    text: newNote.value,
    date: new Date(),
    backgroundColor: getRandomColor(),
  });

  closeNote();
};

// Margin bottom of notes-container decreases if theres notes
const appStyles = computed(() => {
  return {
    marginBottom: notes.value.length > 0 ? '30px' : '200px',
  };
});
</script>

<style scoped>
.user-content {
  width: 100%;
  margin-bottom: 4rem;
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.notes-header button {
  border: none;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background: rgb(35, 35, 56);
  border-radius: 100%;
  color: white;
  font-size: 20px;
}

.notes-header h2 {
  font-size: 2rem;
  font-weight: 600;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.77);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Seems like I did not need to use content property here, or even set the parent property to position relative for this to work */
}

.modal {
  width: 750px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  position: relative; /* Eveerything stayed the same even after I commented this line out */
  display: flex;
  flex-direction: column;
  margin: auto 30px;
}

.modal button {
  padding: 10px 20px;
  font-size: 14px;
  width: 100%;
  background: rgb(35, 35, 56);
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 10px;
}

.modal .close {
  background: rgb(197, 16, 16);
  margin-top: 7px;
}

.modal p {
  color: rgb(197, 16, 16);
}
.notes-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.note {
  width: 185px;
  height: 185px;
  /* background: rgb(237, 182, 44); Dynamically generated from script instead */
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  cursor: pointer;
}

.main-text {
  font-size: 12.5px;
}
.date {
  font-size: 10px;
  font-weight: bold;
}
</style>
