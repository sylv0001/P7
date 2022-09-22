<template>
  <NavBar></NavBar>
  <router-view></router-view>
  <FooTer></FooTer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

body {
  margin: 0;
  background-color: #FFD7D7;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: Lato, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4E5166;
}
</style>