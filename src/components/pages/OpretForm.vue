<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { onMounted } from 'vue';

const props = defineProps({
  title: String,
});

const title = ref('');
const date = ref('');
const location = ref('');
const content = ref('');
const username = ref('admin');
const password = ref('admin');

const onCreatePost = () => {
  // The fields send, to create post
  const body = {
    title: title.value,
    date: date.value,
    location: location.value,
    content: content.value,

  };

  const encodedUser = btoa(`${username.value}:${password.value}`);

  // Send the POST request to the server
  fetch('https://sesh.mg-visions.com/index.php/wp-json/wp/v2/event', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': encodedUser
    },
    body: JSON.stringify(body),
  })
    // Success response
    .then((response) => {
      console.log(response);
    })
    // Error response
    .catch((error) => {
      console.log(error);
    });
};

const inputFile = ref(null);

function handleFileSelect() {
  const file = inputFile.value.files[0];
  // Do something with the selected file
}

function handleClick() {
  inputFile.value.click();
}

function handleClose() {
  const formOverlay = document.getElementById('form-overlay');
  formOverlay.style.display = 'none';
}

onMounted(() => {
  inputFile.value.addEventListener('change', handleFileSelect);
});

</script>

<template>
  <div class="form-overlay" id="form-overlay">
    <div class="form_container" id="form-container">

      <form @submit.prevent="onCreatePost">
        <h2 class="formtitel" >Opret Event</h2>
        <p class="formbeskrivelse">Få dit skaterevent vist på vores eventside ved at udfylde alle nedenstående felter</p>
        <div>
          <label for="title">Event Navn</label>
          <div>
            <input type="text" id="title" v-model="title">
          </div>
        </div>

        <div class="datoogtid">
          <div class="datoogtid2">
            <label class="datolabel" for="date">Dato</label>
            <div>
              <textarea v-model="date" id="date"></textarea>
            </div>
          </div>
          <div class="datoogtid2">
          <label class="datolabel" for="date">Tid</label>
          <div>
            <textarea v-model="date" id="date"></textarea>
          </div>
          </div>
        </div>

        <div class="billedeimport">
          <label class="billedelabel" for="billede">Tilføj Eventbilled</label>
          <div>
          <button class="importknap" @click="handleClick">+</button>
          <input type="file" ref="inputFile" style="display: none;">
          </div>
        </div>

        <div>
          <label for="content">Beskrivelse</label>
          <div>
            <textarea v-model="content" id="content"></textarea>
          </div>
        </div>

        <div>
          <label for="author">Event Arrangør</label>
          <div>
            <textarea v-model="location" id="author"></textarea>
          </div>
        </div>

        <div class="adresseogby">
          <div class="adresseogby2">
            <label for="location">Adresse</label>
            <div>
              <textarea v-model="date" id="adresse"></textarea>
            </div>
          </div>
          <div class="adresseogby2">
          <label class="bylabel" for="by">By</label>
          <div>
            <textarea v-model="date" id="date"></textarea>
          </div>
          </div>
        </div>

        <div class="pris2">
          <label for="pris">Pris</label>
          <div>
            <textarea v-model="location" id="pris"></textarea>
          </div>
        </div>

          <div class="formknapper">
            <button class="createpostknap" type="submit">Opret Event</button>
            <button class="annullerknap" type="button" @click="handleClose">Annullér</button>
          </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Center the form contents vertically and horizontally */
.form-overlay form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: #0a0a0a;
  padding: 2rem;
}

/* Style form input fields and buttons */
.form-overlay input,
.form-overlay button {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
}

.form-overlay button {
  background-color: #CC3333;
  color: #ffffff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 130px;
}

button.importknap {
width: 45px;
height: 45px;
font-size: 16px;
}

button.createpostknap, .annullerknap {
  margin-right: 20px;
  margin-left: 20px;
}


.form-overlay button:hover {
  background-color: #961b1b;
}

#title {
  width: 300px;
  height: 0px;
}

#date, #adresse, #pris {
  width: 135px;
  height: 30px;
}

.datoogtid {
display: flex;
flex-direction: row;
justify-content: space-between;
}

.adresseogby {
display: flex;
flex-direction: row;
justify-content: space-between;
}

.datoogtid2 {
margin-right: 15px;
margin-left: 15px;
}

.adresseogby2 {
margin-right: 15px;
margin-left: 15px;
}

#author {
  width: 300px;
  height: 30px;
}

.pris2 {
  margin-left: -170px;
  margin-bottom: 20px;
}

.billedeimport {
  margin-left: -190px;
}

#content {
  width: 300px;
  height: 100px;
}

.formtitel {
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: 500;
}

.formbeskrivelse {
  width: 90%;
  font-size: 14px;
  text-align: center;
}

.formknapper {
  display: flex;
  justify-content: space-between;
}

</style>