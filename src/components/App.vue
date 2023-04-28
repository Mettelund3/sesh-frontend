<script setup>
</script>

<template>



<nav id="nav">
    <ul class="list-link">
        <router-link class="nav-link" to="/">Forside</router-link>
        <router-link class="nav-link" to="/">Skateskole</router-link>
        <router-link class="nav-link" to="/">Om Sesh</router-link>
        <router-link class="nav-link" to="/">Tilmelding</router-link>
        <router-link class="nav-link" to="./Event">Events</router-link>
    </ul>
</nav>
<router-view/>
</template>

<style scoped>
@import "../assets/_nav.scss";
</style>