<script setup>


</script>


<template>


    
    <div class="sidebar">
        <h2 class="headtext_sidebar">Seneste tilføjede Events</h2>
        <hr class="line2">

        <div class="latest_row">
            <div class="latest_img"> 
                <img/>
            </div>
            <div class="latest_content">
                <h4 >test title</h4>       
                <p class="p_latest">test date</p>
            </div>
        </div>

    </div>

</template>

<style scoped>


.latest_row {
    display: flex;
    flex-wrap: wrap;
}

.latest_content {
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;
    margin-left: 1em;
    margin-right: 1em;
}
.latest_img {
    width: 80px;
    height: 80px;
    background-color: rgb(79, 124, 163);
    margin-left: 2em;
    margin-top: 2em;
}

</style>