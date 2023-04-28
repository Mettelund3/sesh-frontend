<script setup>
import { ref } from 'vue';
import OpretForm from '@/components/pages/OpretForm.vue';
import SeshFooter from '@/components/pages/SeshFooter.vue';

const events = ref([]);
const showForm = ref(false);

const getPlainText = (content) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(content, 'text/html');
  const firstParagraph = html.querySelector('p');
  const plainText = firstParagraph.textContent;
  const noHtmlText = plainText.replace(/<(?:.|\n)*?>/gm, '');
  return noHtmlText;
};


const getPlainDate = (dateString) => {
  const year = dateString.substring(0, 4);
  const monthNumber = parseInt(dateString.substring(4, 6)) - 1;
  const day = parseInt(dateString.substring(6, 8));

  const monthNames = [
    "Januar", "Februar", "Marts",
    "April", "Maj", "Juni", "Juli",
    "August", "September", "Oktober",
    "November", "December"
  ];

  const monthName = monthNames[monthNumber];

  return `${day} ${monthName}`;
};

const getFeaturedImageUrl = (event) => {
  const content = event.content.rendered;
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  if (match) {
    return match[1];
  } else {
    return '';
  }
};



fetch('https://sesh.mg-visions.com/index.php/wp-json/wp/v2/event')
  .then(response => response.json())
  .then(data => {
    events.value = data.map(event => {
      const plainDate = getPlainDate(event.acf.event_date);
      const plainText = getPlainText(event.content.rendered);
      return { ...event, plainText, plainDate, eventLocation: event.acf.location };
    });
  });



</script>

<template>
  <div class="darkframe">
    <div class="">
      <img class="banner" src="../../assets/bannerheader2.png" alt="">
    </div>

    <div class="event_calender_list">
      <div class="list_head">
        <div>
          <button id="arrow-left"></button>
          <button id="arrow-right"></button>
        </div>
        <button @click="showForm = true" class="btn_addevent">Opret Event</button>
      </div>
      <div class="month_layout">
        <h2 class="h2month">April 2023</h2>
        <hr class="line">
      </div>
    </div>
    <div class="list_sidebar_wrap">

      <div class="event_calender_row" v-for="event in events" :key="event.id">
        <div class="event_calender_item">
          <div class="event_calender_date_tag">
            <p class="date_style" v-if="event">{{ event.plainDate }}</p>
          </div>
          <div class="event_calender_content">
            <div class="event_detail">
              <p class="event_loc">{{ event.eventLocation }}</p>
              <h3>{{ event.title.rendered }}</h3>
              <p class="event_ex">{{ getPlainText(event.excerpt.rendered) }}</p>
            </div>
            <div class="event_img">
              <img class="img_list" :src="getFeaturedImageUrl(event)" :alt="event.title.rendered" />
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar">
        <img />
        <h3 style="color:white">title</h3>
        <p style="color:white">date</p>
      </div>
    </div>
  </div>


  <teleport to="body">
    <div v-if="showForm">
      <OpretForm />
    </div>
  </teleport>

  <div>
    <SeshFooter />
  </div>
</template>

<style scoped>




</style>