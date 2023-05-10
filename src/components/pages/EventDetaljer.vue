<script setup>
import RightSidebar from '../RightSidebar.vue';
</script>

<template>
    <section class="darkframe">
        <div class="header">
            <img class="banner" src="../../assets/bannerheader1.png" alt="">
        </div>
        <div>
            <div class="edtitelbg">
                <h2 class="edtitel">Indvielse af skatebænke & Best linje i Nicolai gården i Kolding by</h2>
                <p class="eddato">Lørdag d. 13 Maj - 16:00-18:00</p>
            </div>
            <img class="edbanner" src="../../assets/skate60001.jpg" alt="">
        </div>
        <div class="edbox">
            <h4 class="edh4">Om Eventet</h4>
            <p>Vi i skate6000 har fået bygget nogle bænke som skal stå i Nicolai gården over sommeren 2023. Vi afholder indvielse af de nye bænke lørdag d. 13 maj kl 16:00. Der vil være musik og god session. </p>
            <h4 class="edh4">Arrangør</h4>
            <p>Skate6000 & Batiste Co</p>
            <h4 class="edh4">Adresse</h4>
            <p>Skolegade 2 C, 6000 Kolding</p>
            <h4 class="edh4">Pris</h4>
            <p>Gratis</p>
        </div>
        <router-link class="edlink" to="/Event"><button class="edknap" id="edpil">Tilbage</button></router-link>
    </section>
</template>

<style scoped>
@import "../../assets/_base.scss";
@import "../../assets/_eventdetaljer.scss";
</style>