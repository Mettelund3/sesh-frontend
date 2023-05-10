<script setup>
import { computed, ref, onMounted } from 'vue';

const events = ref([]);

const getPlainDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}-${month}-${day}`;
};

const getPlainText = (content) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(content, 'text/html');
  const firstParagraph = html.querySelector('p');
  const plainText = firstParagraph.textContent;
  const noHtmlText = plainText.replace(/<(?:.|\n)*?>/gm, '');
  return noHtmlText;
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

const filteredEvents = computed(() => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const eventsInCurrentMonth = events.value.filter(event => {
    return event.plainDate.startsWith(currentMonth);
  });
  const sortedEvents = eventsInCurrentMonth.sort((a, b) => {
    const dateA = new Date(a.plainDate);
    const dateB = new Date(b.plainDate);
    return dateA - dateB;
  });
  return sortedEvents;
});

const upcomingEvents = computed(() => {
  const now = new Date();
  return filteredEvents.value.filter(event => new Date(event.plainDate) > now);
});

onMounted(() => {
  fetch('https://sesh.mg-visions.com/index.php/wp-json/wp/v2/event')
    .then(response => response.json())
    .then(data => {
      events.value = data.map(event => {
        const plainDate = getPlainDate(event.acf.event_date);
        const plainText = getPlainText(event.content.rendered);
        return { ...event, plainText, plainDate };
      });
    });
});
</script>

<template>
    <div class="sidebar">
      <h2 class="headtext_sidebar">Kommende Events</h2>
      <hr class="sidebar_line" />
      <div v-for="event in upcomingEvents" :key="event.id" class="sidebar_event">
        <img class="sidebar_img" :src="getFeaturedImageUrl(event)" :alt="event.title.rendered" />
        <div class="sidebar_event_details">
          <h3 class="sidebar_title">{{ event.title.rendered }}</h3>
          <p class="sidebar_date">{{ new Date(event.plainDate).toLocaleDateString('da-DK', {month: 'long', day: 'numeric' }) }}</p>
        </div>
      </div>
    </div>
</template>