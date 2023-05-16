<script setup>
import RightSidebar from '../RightSidebar.vue';
import SeshFooter from '../SeshFooter.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';


const route = useRoute();

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

const getFeaturedImageUrl = (post) => {
  if (post && post.content && post.content.rendered) {
    const match = post.content.rendered.match(/<img[^>]+src="([^">]+)"/);
    if (match) {
      return match[1];
    }
  }
  return '';
};


const id = route.params.id;
const post = ref(null);
const error = ref(null);

onBeforeMount(async () => {
  try {
    const response = await fetch(`https://sesh.mg-visions.com/index.php/wp-json/wp/v2/event/${id}`);
    


      if (!response.ok){
        throw new Error(`error:${response.status}`)
        
      }

     post.value = await response.json();

  } catch (error) {
    console.error(error);
    
  }
  return {post,error};
  });
 


</script>



<template>
  <section class="event_layout">
    <div class="header">
      <img class="banner" src="../../assets/bannerheader1.png" alt="">
    </div>
    <div class="darkframe"></div>
    <div class="event_dlayout">
      <div class="event_content">
        <div class=" bodygrid list_wrap" v-if="post">
          <div class="edtitelbg">
            <h2 class="edtitel"> {{ post.title.rendered }}</h2>
            <p class="eddato">{{ getPlainDate(post.acf.event_date) }} </p>
          </div>
          <img class="edbanner" :src="getFeaturedImageUrl(post)" :alt="post.title.rendered"/>
          <div class="edbox">
            <h4 class="edh4">Om Eventet</h4>
            <p> {{ getPlainText(post.content.rendered) }}</p>
            
            <h4 class="edh4">Adresse</h4>
            <p>{{ post.acf.location }}</p>
          </div>
      <router-link class="edlink" to="/"><button class="edknap" id="edpil">Tilbage</button></router-link>

        </div>
        <div v-else>
          <h2>Event kan ikke findes</h2>
        </div>

    
      </div>
      <div class="rightSide">
        <RightSidebar />
      </div>
    </div>
    
    <div class="footer">
      <SeshFooter />
    </div>
  </section>
</template>