<template>

<form class="search" action="">
  <input type="search" placeholder="Search here..." required>
    <div class="btn_wrap">
        <button type="submit" class="search_btn">Search</button>
        <button class="btn_toggle"> Liste </button>
        <button class="btn_toggle"> Måned</button>
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
  height: 37px;
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
.search .search_btn {

    border: 0;
    padding: 0;
    cursor: pointer;
    height: 35px;
    width: 100px;
    color: #fff;
    background-color: #CC3333;
    border-left: 1px solid #fff;
    border-radius: 0 3px 3px 0;
}
.search .search_btn:hover {
  background: #fff;
  color: #444;
}
.search .search_btn:active {
  box-shadow: 0px 0px 12px 0px #e1e1e1;
}
.search .search_btn:focus {
  outline: 0;
}

.btn_toggle {
  font-size: 18px;
  color: #e1e1e1;
  background-color: #CC3333;
  margin-left: 10%;

  font-family: inherit;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  border: none;
  background: none;
  text-transform: uppercase;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: color;
}

.btn_toggle:focus,
.btn_toggle:hover {
  color:#CC3333;
}


.btn_toggle:focus:after,
.btn_toggle:hover:after {
  width: 100%;
  left: 0%;
}

.btn_toggle:after {
  content: "";
  pointer-events: none;
  bottom: -2px;
  left: 50%;
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: #CC3333;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: width, left;
}
</style>