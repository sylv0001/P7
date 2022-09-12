<template>
    <NavBar></NavBar>
    <LoGo></LoGo>
    <ModiFy></ModiFy>
    <FooTer></FooTer>
    <router-view></router-view>
  </template>
  
  <script>
  // @ is an alias to /src
  import NavBar from '@/components/NavBar.vue'
  import LoGo from '@/components/LoGo'
  import ModiFy from '@/components/ModiFy.vue'
  import FooTer from '@/components/FooTer.vue'
  
  export default {
    components: {
      NavBar,
      LoGo,
      ModiFy,
      FooTer
    }
  }
  </script>
