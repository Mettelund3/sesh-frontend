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
  #nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2em;
  }

  .list-link {
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-link {
    margin: 0 2em;
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }

  .nav-link:hover {
    color: #000;
  }
</style>