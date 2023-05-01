<template>

<form class="search" action="">
  <input type="search" placeholder="Search here..." required>
    <div class="btn_wrap">
        <button type="submit">Search</button>
        <button> Liste </button>
        <button> Måned</button>
    </div>
</form>

</template>

<style scoped>


.btn_wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-end;
    margin-left: 1em;
}
.search {
  width: auto;
  height: 40px;
  margin: 25px 0 25px 0;
  background: #444;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  border: 1px solid #fff;
}
.search input {
  width: 370px;
  padding: 10px 5px;
  float: left;
  color: #ccc;
  border: 0;
  background: transparent;
  border-radius: 3px 0 0 3px;
}
.search input:focus {
  outline: 0;
  background: transparent;
}
.search button {

    border: 0;
    padding: 0;
    cursor: pointer;
    height: 35px;
    width: 100px;
    margin-left:10%;
    color: #fff;
    background-color: #CC3333;
    border-left: 1px solid #fff;
    border-radius: 0 3px 3px 0;
}
.search button:hover {
  background: #fff;
  color: #444;
}
.search button:active {
  box-shadow: 0px 0px 12px 0px #e1e1e1;
}
.search button:focus {
  outline: 0;
}

</style>