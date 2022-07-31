<template>
  <NavBar></NavBar>
  <LoGo></LoGo>
  <LogIn></LogIn>
  <FooTer></FooTer>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import LoGo from '@/components/LoGo'
import LogIn from '@/components/LogIn'
import FooTer from '@/components/FooTer.vue'

export default {
  components: {
    NavBar,
    LoGo,
    LogIn,
    FooTer
  }
}
</script>