<script setup>
import { ref } from 'vue';
import SeshFooter from '@/components/pages/SeshFooter.vue';
import OpretForm from '@/components/pages/OpretForm.vue';

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

<section class="layout">
    <div class="header">
        <div class="darkframe">
            <div class="">
                <img class="banner" src="../../assets/bannerheader1.png" alt="">
            </div>

            <div class="event_calender_list">
                <div class="list_head">
                    <div>
                        <button id="arrow-left"></button>
                        <button id="arrow-right"></button>
                    </div>
                    <button @click="showForm = true" class="btn_addevent">Opret Event</button>
                </div>
            </div>
            <div class="month_layout">
                <h2 class="h2month">April 2023</h2>
                <hr class="line">
            </div>
        </div>
    </div>

    <div class="bodygrid list_wrap">2
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
    </div>

    <div class="rightSide" v-for="event in events" :key="event.id">
        <h2>Seneste Tilføjede Events</h2>
        <div class="sidebar">
            <div class="event_img">
              <img class="img_list" :src="getFeaturedImageUrl(event)" :alt="event.title.rendered" />
            </div>
        <h3 style="color:white">{{ event.title.rendered }}</h3>
        <p class="date_style" v-if="event">{{ event.plainDate }}</p>
      </div>
    </div>

    <teleport to="body">
    <div v-if="showForm">
      <OpretForm />
    </div>
  </teleport>


  <div class="footer">
    <SeshFooter />

  </div>
  
</section>



</template>



<style scoped>

.layout {
  width: 100%;
  height: 768px;
  background-color: black;
  display: grid;
  grid:
    "header header header header" auto
    "body body rightSide rightside" 1fr
    "footer footer footer footer" auto
    / auto 1fr auto;
  gap: 0px;
  grid-auto-flow: row dense;
}

.header { 
    grid-area: header; 
}
.bodygrid { 
    grid-area: body;
    background-color: rgb(0, 0, 0);
}

.list_wrap {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.rightSide { 
    grid-area: rightSide;
    background-color: rgb(0, 0, 0);
    border-style: dashed;
    border-color: bisque;
}
.footer { 
    grid-area: footer; 
    background-color: rgb(255, 255, 255)
}


</style>
