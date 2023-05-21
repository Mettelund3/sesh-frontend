<script setup>
import { ref, onMounted } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});

const title = ref("");
const date = ref("");
const location = ref("");
const content = ref("");
const username = ref("admin");
const password = ref("admin");

function formatDate(da) {
  const d = new Date(da);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${formattedDay}.${formattedMonth}.${year}`;
}

const onCreatePost = () => {
  const body = {
    title: title.value,
    date: formatDate(date.value),
    location: location.value,
    content: content.value,
  };

const encodedUser = btoa(`${username.value}:${password.value}`);

fetch('https://sesh.mg-visions.com/index.php/wp-json/wp/v2/event', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': encodedUser
    },
    body: JSON.stringify(body),
    })
    .then((response) => {
      return response.json()
    })

    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
};

const inputFile = ref(null);

function handleFileSelect() {
  const file = inputFile.value.files[0];
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
            <input type="text" v-model="title" id="title" >
          </div>
        </div>

        <div class="datoogtid">
          <div class="datoogtid2">
            <label class="datolabel" for="date">Dato</label>
            <div>
              <input type="date" v-model="date" id="date">
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


        <div class="adresseogby">
          <div class="adresseogby2">
            <label for="location">Adresse</label>
            <div>
              <input type="text" v-model="location" id="location">
            </div>
          </div>
          <div class="adresseogby2">
          <label class="bylabel" for="by">By</label>
          <div>
            <input type="text" v-model="location" id="location">
          </div>
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