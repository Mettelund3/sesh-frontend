<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import SeshFooter from '../SeshFooter.vue';
import OpretForm from '../OpretForm.vue';
import SearchSection from '../SearchSection.vue';
import RightSidebar from '../RightSidebar.vue';

const router = useRouter();
const events = ref([]);
const showForm = ref(false);
const shouldUpdateFilteredEvents = ref(false);

const getPlainText = (content) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(content, 'text/html');
  const firstParagraph = html.querySelector('p');
  const plainText = firstParagraph ? firstParagraph.textContent : '';
  const noHtmlText = plainText.replace(/<(?:.|\n)*?>/gm, '');
  return noHtmlText;
};

const getPlainDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}-${month}-${day}`;
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
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  currentMonth.value = `${year}-${month}`;
  filteredEvents.value;
};




const filteredEvents = computed(() => {
  const eventsInCurrentMonth = events.value.filter(event => {
    return event.plainDate.startsWith(currentMonth.value);
  });

  const sortedEvents = eventsInCurrentMonth.sort((a, b) => {
    const dateA = new Date(a.plainDate);
    const dateB = new Date(b.plainDate);
    return dateA - dateB;
  });

  return sortedEvents;
});

onMounted(() => {
  fetch('https://sesh.mg-visions.com/index.php/wp-json/wp/v2/event')
    .then(response => response.json())
    .then(data => {
      events.value = data.map(event => {
        const plainDate = getPlainDate(event.acf.event_date);
        const plainText = getPlainText(event.content.renderd);
        return { ...event, plainText, plainDate, eventLocation: event.acf.location };
      });
      
      changeMonth(0);
      console.log(filteredEvents.value);
    })
    .catch(error => {
      console.error(error);
    });
});


//  @click="$router.push(`/eventdetaljer/${event.id}`,{params:{id:event.id}} )">
</script>




<template>
  <section class="layout">
    <div class="header">
      <img class="banner" src="../../assets/bannerheader1.png" alt="">
      <div class="darkframe"></div>
    </div>

    <div class="bodygrid list_wrap">
      <div class="salami">
        <SearchSection />

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
          <h2 class="h2month">{{ currentDate.toLocaleDateString('da-DK', {
            month: 'long', year: 'numeric'
          }).replace(/^\w/,
            (c) => c.toUpperCase()) }} </h2>
          <hr class="line">
        </div>
      </div>

      <div class="event_calender_row" v-for="event in filteredEvents" :key="event.id"
        @click="$router.push(`/eventdetaljer/${event.id}`)">
        <div class="event_calender_item">
          <div class="event_calender_date_tag">
            <p class="date_style" v-if="event">{{ new Date(event.plainDate).toLocaleString('da-DA', {
              month: 'long', day:
                'numeric'
            }) }}</p>
          </div>
          <RouterLink class="edlink" to="/EventDetaljer">
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
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="rightSide">
      <RightSidebar />
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