<script setup>
import { ref, onMounted } from 'vue';
import SeshFooter from '../pages/SeshFooter.vue';
import OpretForm from '../pages/OpretForm.vue';
import SearchSection from '../SearchSection.vue';
import RightSidebar from '../RightSidebar.vue';

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

  return `${day} ${monthName} ${year}`;
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

const getMonthName = (date) => {
  const months = [
    "Januar", "Februar", "Marts", "April", "Maj", "Juni",
    "Juli", "August", "September", "Oktober", "November", "December"
  ];
  const monthIndex = date.getMonth();
  return months[monthIndex];
};

const currentDate = new Date();
const currentMonth = ref('');
currentMonth.value = getMonthName(currentDate) + ' ' + currentDate.getFullYear();

const changeMonth = (direction) => {
  currentDate.setMonth(currentDate.getMonth() + direction);
  currentMonth.value = getMonthName(currentDate) + ' ' + currentDate.getFullYear();
};

onMounted(() => {
  currentMonth.value = getMonthName(currentDate) + ' ' + currentDate.getFullYear();
});

fetch('https://sesh.mg-visions.com/index.php/wp-json/wp/v2/event')
  .then(response => response.json())
  .then(data => {
    events.value = data.map(event => {
      const plainDate = getPlainDate(event.acf.event_date);
      const plainText = getPlainText(event.content.rendered);
      return { ...event, plainText, plainDate, eventLocation: event.acf.location,currentMonth };
    });
  });
</script>




<template>

<section class="layout">
    <div class="header">
       <img class="banner" src="../../assets/bannerheader1.png" alt="">
        <div class="darkframe"></div>
    </div>
    
    <div class="bodygrid list_wrap">2
      <div class="salami">
        <SearchSection/>

        <div class="event_calender_list">
            <div class="list_head">
                <div>
                    <button id="arrow-left" @click="changeMonth(-1)"></button>
                    <button id="arrow-right" @click="changeMonth(1)"></button>
                </div>
                <button @click="showForm = true" class="btn_addevent">Opret Event</button>
            </div>
        </div>
        <div class="month_layout">
            <h2 class="h2month">{{ currentMonth }}</h2>
            <hr class="line">
        </div>
      </div>
        <div class="event_calender_row" v-for="event in events" :key="event.id">

          

        <div class="event_calender_item">
          <div class="event_calender_date_tag">
            <p class="date_style" v-if="event">{{ event.plainDate }}</p>
          </div>
          <router-link class="edlink" to="/EventDetaljer"><div class="event_calender_content">
            <div class="event_detail">
              <p class="event_loc">{{ event.eventLocation }}</p>
              <h3>{{ event.title.rendered }}</h3>
              <p class="event_ex">{{ getPlainText(event.excerpt.rendered) }}</p>
            </div>
            <div class="event_img">
              <img class="img_list" :src="getFeaturedImageUrl(event)" :alt="event.title.rendered" />
            </div>
          </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="rightSide">
      <RightSidebar/>
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
  width: 1366px;
  height: auto;
  background-color: black;
  display: grid;
  grid:
    "header header header header" auto
    "body body rightSide rightSide" 1fr
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
    border-style: solid;
    border-color: rgb(253, 253, 253);
    margin: 1em;
    clear: both;
    width: auto;   
}

.salami {
  margin: 1em;
}
.footer { 
    grid-area: footer; 
    background-color: rgb(255, 255, 255)
}




</style>
