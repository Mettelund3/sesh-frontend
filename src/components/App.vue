<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
<nav id="nav">
    <ul class="list-link">
        <router-link active-class="active" class="nav-link" to="/">Forside</router-link>
        <router-link class="nav-link" to="./NotFound">Skateskole</router-link>
        <router-link class="nav-link" to="./NotFound">Om Sesh</router-link>
        <router-link class="nav-link" to="./NotFound">Tilmelding</router-link>
        <router-link active-class="active" class="nav-link" to="./Event">Events</router-link>
    </ul>
</nav>
<section class="layout">
    
<router-view/>

</section>
</template>