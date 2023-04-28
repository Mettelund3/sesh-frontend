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
      
    
    <teleport to="body">
      <div v-if="showForm">
        <OpretForm />
      </div>
    </teleport>
    
    <div><SeshFooter/></div>
</template>
<style scoped>


/* nav*/




/* layout*/
.darkframe {
  max-width: fit-content;
  background-color: black;
  padding: 1em;
}






/* liste calender*/

.event_calender_row {
  display: flex;
  flex-wrap: wrap;
}


.event_calender_item {
  display: flex;
  align-items: center;
  margin: 1rem 1rem 1rem 1rem;
  background-color: rgb(0, 0, 0);
}

.event_calender_date_tag {
  flex: 0 auto;
  margin: 1rem;
  justify-content:first baseline;
}

.event_calender_content {
  display: flex;
  align-items: center;
}

.event_detail {
  flex: 1 1 auto;
  margin-right: 2rem;
  padding: 1rem;
  background-color: white;
}

.event_img {
  flex: 0 1 auto;
  
}

.img_list {
  width: 300px;
  height: auto;
  
}



.list_head {
  display: flex;
  justify-content: space-between;  
}

.month_layout {
  display: flex;
  align-items: center;
}

.h2month {
  margin-right: 10px;
  color:white;
}

.line {
  flex-grow: 1;
  height: 1px;
  background-color: black;
  margin-left: 10px;
}

/* styling */
h1 {
  color: white;
}

h3 {
  color: black;
  font-size: 1.5em;
  font-weight: 600;
  font-family: 'AvenirH' Avenir;
}

.date_style {
  justify-content: flex-start;
  text-align: center;
  font-size: 1.25em;
  font-weight: 600;
  padding: 1rem;
  color: black;
  background-color: rgb(255, 255, 255);
}

.event_loc {
  color: rgb(15, 15, 15);
  font-weight: 500;
  font-size: 1em;
}

.event_ex {
  color: black;
  font-size: 1em;
}



.banner {
  display: flex;
  max-width: 100%;
  height: auto;
  margin-bottom: 5%;
}


/* buttons */

#arrow-left {
  background-image: url('../../assets/arrowleft.svg');
  background-color: black;
  background-size: contain;
  background-repeat: no-repeat;
  padding: 1em;
  border: none;
  
}

#arrow-right {
  background-image: url('../../assets/right-arrow.svg');
  background-color: black;
  background-size: contain;
  background-repeat: no-repeat;
  padding: 1em;
  border: none;
  margin-left: 10px;
}
.btn_addevent {
  height: 35px;
  width: 100px; 
  background-image: url('../../assets/sesh-knap.png');
  color: rgb(255, 255, 255);
  border: none;
  
}


</style>